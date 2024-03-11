import { Typography, useTheme } from '@mui/material';
import React, { FC, useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TableItemActions } from '~/components/TableItemActions';
import { useModalContext } from '~/pages/scaffolding/providers/ModalProvider';
import { DataService } from '~/services/data';
import {
	REQUEST_KEY_DELETE_ENV_MANAGEMENT,
	REQUEST_KEY_GET_ENV_MANAGEMENT_LIST,
} from '~/services/data/envManagement/requestKeys';
import {
	REQUEST_KEY_DELETE_ENV_MAPPING,
	REQUEST_KEY_GET_ENV_MAPPING_LIST,
} from '~/services/data/envMapping/requestKeys';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { TableEnvManagementActionsProps } from './types';

export const TableEnvManagementActions: FC<TableEnvManagementActionsProps> = ({ data }) => {
	const theme = useTheme();
	const {
		handleDeleteModalOpen,
		handleDeleteModalClose,
		handleAlertModalOpen,
		handleUpdateEnvManagementModalOpen,
	} = useModalContext();
	const queryClient = useQueryClient();

	const { LOBSelection } = useCreateConfigurationScaffoldingStore();

	const { data: envMappingData } = useQuery(REQUEST_KEY_GET_ENV_MAPPING_LIST, () =>
		DataService.getEnvMappingList(LOBSelection.uuid),
	);

	const mutationDeleteMapping = useMutation({
		mutationKey: REQUEST_KEY_DELETE_ENV_MAPPING,
		mutationFn: (payload: string) => DataService.deleteEnvMapping(payload, data.lob.uuid),
		onSuccess: async () => {
			handleDeleteModalClose();
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MAPPING_LIST],
			});
		},
	});

	const mutation = useMutation({
		mutationKey: REQUEST_KEY_DELETE_ENV_MANAGEMENT,
		mutationFn: (payload: string) => DataService.deleteEnvManagement(payload, data.lob.uuid),
		onSuccess: async () => {
			handleDeleteModalClose();
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MANAGEMENT_LIST],
			});

			const envMappingItem = envMappingData.find(
				(itemMapping) => itemMapping.env.uuid === data.uuid,
			);

			if (envMappingItem) {
				mutationDeleteMapping.mutate(envMappingItem.uuid);
			}
		},
	});

	const handleRemove = useCallback(() => {
		mutation.mutate(data.uuid);
	}, [data.uuid, mutation]);

	const actions = useMemo(
		() => [
			{
				label: 'Edit',
				disabled: mutation.isLoading,
				onClick: () =>
					envMappingData.some((item) => item.env.uuid === data.uuid)
						? handleAlertModalOpen({
								name: 'Are you sure?',
								text: (
									<Typography component={'span'} variant='body2'>
										You are going to update the{' '}
										<Typography
											component={'span'}
											color={theme.palette.text.primary}
										>
											{data.name}
										</Typography>{' '}
										environment. This environment is already used in the mapping
										environment
									</Typography>
								),
								handleConfirm: () => handleUpdateEnvManagementModalOpen({ data }),
								confirmButton: 'Edit',
								cancelButton: 'Cancel',
						  })
						: handleUpdateEnvManagementModalOpen({ data }),
			},
			{
				label: 'Remove',
				disabled: mutation.isLoading,
				onClick: () =>
					handleDeleteModalOpen({
						name: data.name,
						text: 'environment',
						handleConfirm: handleRemove,
					}),
			},
		],
		[
			mutation.isLoading,
			envMappingData,
			handleAlertModalOpen,
			theme.palette.text.primary,
			data,
			handleUpdateEnvManagementModalOpen,
			handleDeleteModalOpen,
			handleRemove,
		],
	);

	return <TableItemActions actions={actions} />;
};
