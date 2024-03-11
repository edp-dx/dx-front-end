import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { DeleteModal } from '~/components/DeleteModal';
import { FormAccordion } from '~/pages/scaffolding/components/FormAccordion';
import { useEnvMapping } from '~/pages/scaffolding/hooks/useEnvMapping';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { DataService } from '~/services/data';
import {
	GCPEnvConfiguration,
	GCPEnvConfigurationPayload,
} from '~/services/data/envConfigurations/model';
import {
	REQUEST_KEY_CREATE_ENV_CONFIGURATION_GCP,
	REQUEST_KEY_DELETE_ENV_CONFIGURATION_GCP,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP,
	REQUEST_KEY_UPDATE_ENV_CONFIGURATION_GCP,
} from '~/services/data/envConfigurations/requestKeys';
import { FormTextField } from '~/shared-components/FormTextField';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';

import { GCPEnvConfigurationItemProps } from './types';

export const GCPEnvConfigurationItem: FC<GCPEnvConfigurationItemProps> = ({ item }) => {
	const queryClient = useQueryClient();
	const theme = useTheme();
	const [expanded, setExpanded] = useState(!!item?.active);

	const handleAccordionClose = useCallback(() => {
		setExpanded(false);
	}, []);

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setModalVisible(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setModalVisible(false);
	}, []);

	const { LOBSelection, GCPEnvConfigurations, setGCPEnvConfigurationsTemplate } =
		useCreateConfigurationScaffoldingStore();

	const {
		control,
		register,
		reset,
		formState: { errors, isValid, isDirty },
		handleSubmit,
	} = useForm();

	const [updateMapping, deleteMapping, envMappingItem] = useEnvMapping({
		item,
		fieldName: 'gcpEnv',
	});

	const mutationCreate = useMutation({
		mutationKey: REQUEST_KEY_CREATE_ENV_CONFIGURATION_GCP,
		mutationFn: (payload: GCPEnvConfigurationPayload) =>
			DataService.createEnvConfigurationGCP(payload, LOBSelection.uuid),
		onSuccess: async (data: GCPEnvConfiguration) => {
			setGCPEnvConfigurationsTemplate([]);
			reset(data);
			queryClient.setQueryData(REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP, [
				...GCPEnvConfigurations,
				data,
			]);
		},
	});

	const mutationUpdate = useMutation({
		mutationKey: REQUEST_KEY_UPDATE_ENV_CONFIGURATION_GCP,
		mutationFn: (payload: GCPEnvConfigurationPayload) =>
			DataService.updateEnvConfigurationGCP(payload, LOBSelection.uuid),
		onSuccess: async (data) => {
			reset(data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP],
			});

			updateMapping();
		},
	});

	const mutationDelete = useMutation({
		mutationKey: REQUEST_KEY_DELETE_ENV_CONFIGURATION_GCP,
		mutationFn: (payload: string) =>
			DataService.deleteEnvConfigurationGCP(payload, item.lob.uuid),
		onSuccess: async () => {
			handleAccordionClose();
			handleModalClose();
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP],
			});

			deleteMapping();
		},
	});

	const isLoading =
		mutationCreate.isLoading || mutationUpdate.isLoading || mutationDelete.isLoading;
	const formAccordionName = item.projectName;

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES.GCP>) => {
			handleAccordionClose();
			if (item.active) {
				mutationCreate.mutate({
					uuid: item.uuid,
					...data,
				});
			} else {
				mutationUpdate.mutate({
					uuid: item.uuid,
					...data,
				});
			}
		},
		[handleAccordionClose, item.active, item.uuid, mutationCreate, mutationUpdate],
	);

	const onDelete = () => {
		if (item.active) {
			setGCPEnvConfigurationsTemplate([]);
		} else {
			mutationDelete.mutate(item.uuid);
		}
	};

	return (
		<Box width={'100%'}>
			<FormAccordion
				name={item.projectName ? formAccordionName : 'New GCP Account'}
				expanded={expanded}
				disabled={isLoading}
				handleChange={setExpanded}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={6}>
						<Stack>
							<FormTextField
								label={'Project Name'}
								defaultValue={item.projectName}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.GCP.projectName, {
									required: 'Project Name',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Project ID'}
								defaultValue={item.projectID}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.GCP.projectID, {
									required: 'Project ID',
								})}
							/>
						</Stack>
						<Stack direction={'row'} justifyContent={'space-between'}>
							<DeleteModal
								name={`${formAccordionName || 'New'} GCP Account`}
								text={`from the current configuration${
									envMappingItem ? ' and from the Environment Mapping' : ''
								}`}
								open={modalVisible}
								handleConfirm={onDelete}
								onClose={handleModalClose}
							/>
							<Tooltip title='Remove' arrow placement='top'>
								<IconButton
									sx={{
										color:
											!isValid || !isDirty
												? theme.palette.action.disabled
												: theme.palette.action.active,
										':hover': { color: theme.palette.primary.main },
									}}
									onClick={handleModalOpen}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
							<Button
								type='submit'
								variant='contained'
								disabled={!isValid || !isDirty || isLoading}
							>
								Save
							</Button>
						</Stack>
					</Stack>
				</form>
			</FormAccordion>
		</Box>
	);
};
