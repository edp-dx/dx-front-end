/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, createContext, useCallback, useContext, useState } from 'react';
import { AlertModal } from '~/components/AlertModal';
import { AlertModalProps } from '~/components/AlertModal/types';
import { DeleteModal } from '~/components/DeleteModal';
import { DeleteModalProps } from '~/components/DeleteModal/types';

import { UpdateTemplatesManagement } from '../../components/UpdateTemplatesManagement';
import { UpdateTemplatesManagementProps } from '../../components/UpdateTemplatesManagement/types';
import { ViewTemplatesManagement } from '../../components/ViewTemplatesManagement';
import { ViewTemplatesManagementProps } from '../../components/ViewTemplatesManagement/types';

export const Context = createContext({
	handleDeleteModalOpen: (_data: DeleteModalProps) => null,
	handleDeleteModalClose: () => null,
	handleAlertModalOpen: (_data: AlertModalProps) => null,
	handleAlertModalClose: () => null,
	handleViewTemplatesManagementOpen: (_data: ViewTemplatesManagementProps) => null,
	handleViewTemplatesManagementClose: () => null,
	handleUpdateTemplatesManagementOpen: (_data: UpdateTemplatesManagementProps) => null,
	handleUpdateTemplatesManagementClose: () => null,
});

interface ModalProviderProps {
	children: React.ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
	const [alertModal, setAlertModal] = useState<AlertModalProps>(undefined);
	const [deleteModal, setDeleteModal] = useState<DeleteModalProps>(undefined);
	const [updateTemplatesManagement, setUpdateTemplatesManagement] =
		useState<UpdateTemplatesManagementProps>(undefined);
	const [viewTemplatesManagement, setViewTemplatesManagement] =
		useState<ViewTemplatesManagementProps>(undefined);

	const handleDeleteModalOpen = useCallback((data: DeleteModalProps) => {
		setDeleteModal(() => ({ ...data, open: true }));
	}, []);

	const handleDeleteModalClose = useCallback(() => {
		setDeleteModal((prev) => ({ ...prev, open: false }));
	}, []);

	const handleAlertModalOpen = useCallback((data: AlertModalProps) => {
		setAlertModal(() => ({ ...data, open: true }));
	}, []);

	const handleAlertModalClose = useCallback(() => {
		setAlertModal((prev) => ({ ...prev, open: false }));
	}, []);

	const handleViewTemplatesManagementOpen = useCallback((data: ViewTemplatesManagementProps) => {
		setViewTemplatesManagement(() => ({ ...data, open: true }));
	}, []);

	const handleViewTemplatesManagementClose = useCallback(() => {
		setViewTemplatesManagement((prev) => ({ ...prev, open: false }));
	}, []);

	const handleUpdateTemplatesManagementOpen = useCallback(
		(data: UpdateTemplatesManagementProps) => {
			setUpdateTemplatesManagement(() => ({ ...data, open: true }));
		},
		[],
	);

	const handleUpdateTemplatesManagementClose = useCallback(() => {
		setUpdateTemplatesManagement((prev) => ({ ...prev, open: false }));
	}, []);

	return (
		<Context.Provider
			value={{
				handleDeleteModalOpen,
				handleDeleteModalClose,
				handleAlertModalClose,
				handleAlertModalOpen,
				handleViewTemplatesManagementOpen,
				handleViewTemplatesManagementClose,
				handleUpdateTemplatesManagementClose,
				handleUpdateTemplatesManagementOpen,
			}}
		>
			{deleteModal && (
				<DeleteModal
					open={deleteModal.open}
					name={deleteModal.name}
					text={deleteModal.text}
					handleConfirm={() => deleteModal.handleConfirm()}
					onClose={() => handleDeleteModalClose()}
				/>
			)}
			{alertModal && (
				<AlertModal
					open={alertModal.open}
					name={alertModal.name}
					text={alertModal.text}
					cancelButton={alertModal.cancelButton}
					confirmButton={alertModal.confirmButton}
					handleConfirm={() => alertModal.handleConfirm()}
					onClose={() => handleAlertModalClose()}
				/>
			)}
			{updateTemplatesManagement && updateTemplatesManagement.open && (
				<UpdateTemplatesManagement
					data={updateTemplatesManagement.data}
					open={updateTemplatesManagement.open}
					onClose={() => handleUpdateTemplatesManagementClose()}
				/>
			)}
			{viewTemplatesManagement && (
				<ViewTemplatesManagement
					data={viewTemplatesManagement.data}
					open={viewTemplatesManagement.open}
					onClose={() => handleViewTemplatesManagementClose()}
				/>
			)}
			{children}
		</Context.Provider>
	);
};

export const useModalContext = () => useContext(Context);
