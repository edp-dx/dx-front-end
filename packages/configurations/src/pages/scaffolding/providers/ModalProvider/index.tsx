/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, createContext, useCallback, useContext, useState } from 'react';
import { AlertModal } from '~/components/AlertModal';
import { AlertModalProps } from '~/components/AlertModal/types';
import { DeleteModal } from '~/components/DeleteModal';
import { DeleteModalProps } from '~/components/DeleteModal/types';

import { UpdateEnvManagement } from '../../components/StepContent/components/EnvManagement/components/UpdateEnvManagement';
import { UpdateEnvManagementProps } from '../../components/StepContent/components/EnvManagement/components/UpdateEnvManagement/types';
import { EnvMappingModalForm } from '../../components/StepContent/components/EnvMapping/components/EnvMappingModalForm';
import { EnvMappingModalFormProps } from '../../components/StepContent/components/EnvMapping/components/EnvMappingModalForm/types';

export const Context = createContext({
	handleDeleteModalOpen: (_data: DeleteModalProps) => null,
	handleDeleteModalClose: () => null,
	handleAlertModalOpen: (_data: AlertModalProps) => null,
	handleAlertModalClose: () => null,
	handleUpdateEnvManagementModalOpen: (_data: UpdateEnvManagementProps) => null,
	handleUpdateEnvManagementModalClose: () => null,
	handleEnvMappingModalOpen: (_data: EnvMappingModalFormProps) => null,
	handleEnvMappingModalClose: () => null,
});

interface ModalProviderProps {
	children: React.ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
	const [alertModal, setAlertModal] = useState<AlertModalProps>(undefined);
	const [deleteModal, setDeleteModal] = useState<DeleteModalProps>(undefined);
	const [envManagementModal, setEnvManagementModal] =
		useState<UpdateEnvManagementProps>(undefined);
	const [envMappingModal, setEnvMappingModal] = useState<EnvMappingModalFormProps>(undefined);

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

	const handleUpdateEnvManagementModalOpen = useCallback(
		(data: UpdateEnvManagementProps) => {
			handleAlertModalClose();
			setEnvManagementModal(() => ({ ...data, open: true }));
		},
		[handleAlertModalClose],
	);

	const handleUpdateEnvManagementModalClose = useCallback(() => {
		setEnvManagementModal((prev) => ({ ...prev, open: false }));
	}, []);

	const handleEnvMappingModalOpen = useCallback((data: EnvMappingModalFormProps) => {
		setEnvMappingModal(() => ({ ...data, open: true }));
	}, []);

	const handleEnvMappingModalClose = useCallback(() => {
		setEnvMappingModal((prev) => ({ ...prev, open: false }));
	}, []);

	return (
		<Context.Provider
			value={{
				handleDeleteModalOpen,
				handleDeleteModalClose,
				handleAlertModalClose,
				handleAlertModalOpen,
				handleUpdateEnvManagementModalOpen,
				handleUpdateEnvManagementModalClose,
				handleEnvMappingModalOpen,
				handleEnvMappingModalClose,
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
			{envManagementModal && envManagementModal.open && (
				<UpdateEnvManagement
					data={envManagementModal.data}
					open={envManagementModal.open}
					onClose={() => handleUpdateEnvManagementModalClose()}
				/>
			)}
			{envMappingModal && envMappingModal.open && (
				<EnvMappingModalForm
					data={envMappingModal.data}
					open={envMappingModal.open}
					onClose={() => handleEnvMappingModalClose()}
				/>
			)}
			{children}
		</Context.Provider>
	);
};

export const useModalContext = () => useContext(Context);
