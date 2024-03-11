import React, { FC, useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TableItemActions } from '~/components/TableItemActions';
import { DataService } from '~/services/data';
import {
	REQUEST_KEY_DELETE_TEMPLATES_MANAGEMENT,
	REQUEST_KEY_GET_TEMPLATES_MANAGEMENT_LIST,
} from '~/services/data/templateManagement/requestKeys';

import { useModalContext } from '../../providers/ModalProvider';
import { TableTemplatesManagementActionsProps } from './types';

export const TableTemplatesManagementActions: FC<TableTemplatesManagementActionsProps> = ({
	data,
}) => {
	const { handleDeleteModalOpen, handleDeleteModalClose, handleUpdateTemplatesManagementOpen } =
		useModalContext();
	const queryClient = useQueryClient();

	const mutationDelete = useMutation({
		mutationKey: REQUEST_KEY_DELETE_TEMPLATES_MANAGEMENT,
		mutationFn: (payload: number) => DataService.deleteTemplatesManagement(payload),
		onSuccess: async () => {
			handleDeleteModalClose();
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_TEMPLATES_MANAGEMENT_LIST],
			});
		},
	});

	const handleRemove = useCallback(() => {
		mutationDelete.mutate(data.id);
	}, [data.id, mutationDelete]);

	const actions = useMemo(
		() => [
			{
				label: 'Edit',
				onClick: () => handleUpdateTemplatesManagementOpen({ data }),
			},
			{
				label: 'Remove',
				disabled: mutationDelete.isLoading,
				onClick: () =>
					handleDeleteModalOpen({
						name: `${data.name}`,
						text: 'from the current Templates Configuration list',
						handleConfirm: handleRemove,
					}),
			},
		],
		[
			data,
			handleDeleteModalOpen,
			handleRemove,
			handleUpdateTemplatesManagementOpen,
			mutationDelete.isLoading,
		],
	);

	return <TableItemActions actions={actions} />;
};
