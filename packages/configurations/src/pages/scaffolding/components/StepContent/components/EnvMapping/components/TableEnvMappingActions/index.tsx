import React, { FC, useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TableItemActions } from '~/components/TableItemActions';
import { useModalContext } from '~/pages/scaffolding/providers/ModalProvider';
import { DataService } from '~/services/data';
import {
	REQUEST_KEY_DELETE_ENV_MAPPING,
	REQUEST_KEY_GET_ENV_MAPPING_LIST,
} from '~/services/data/envMapping/requestKeys';

import { TableEnvMappingActionsProps } from './types';

export const TableEnvMappingActions: FC<TableEnvMappingActionsProps> = ({ data }) => {
	const { handleDeleteModalOpen, handleDeleteModalClose, handleEnvMappingModalOpen } =
		useModalContext();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: REQUEST_KEY_DELETE_ENV_MAPPING,
		mutationFn: (payload: string) => DataService.deleteEnvMapping(payload, data.lob.uuid),
		onSuccess: async () => {
			handleDeleteModalClose();
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MAPPING_LIST],
			});
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
				onClick: () => handleEnvMappingModalOpen({ data }),
			},
			{
				label: 'Remove',
				disabled: mutation.isLoading,
				onClick: () =>
					handleDeleteModalOpen({
						name: `${data.env.name} Mapped Environment`,
						text: 'from the current Environment Mapping Scheme',
						handleConfirm: handleRemove,
					}),
			},
		],
		[data, handleDeleteModalOpen, handleEnvMappingModalOpen, handleRemove, mutation.isLoading],
	);

	return <TableItemActions actions={actions} />;
};
