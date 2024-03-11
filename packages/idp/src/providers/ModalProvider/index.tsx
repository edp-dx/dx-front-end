/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, createContext, useCallback, useContext, useState } from 'react';
import { UpdateDetailsModal } from '~/components/UpdateDetailsModal';
import { UpdateDetailsModalProps } from '~/components/UpdateDetailsModal/types';

export const Context = createContext({
	handleUpdateDetailsModalOpen: (_data: UpdateDetailsModalProps) => null,
	handleUpdateDetailsModalClose: () => null,
});

interface ModalProviderProps {
	children: React.ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
	const [updateDetailsModal, setUpdateDetailsModal] =
		useState<UpdateDetailsModalProps>(undefined);

	const handleUpdateDetailsModalOpen = useCallback((data: UpdateDetailsModalProps) => {
		setUpdateDetailsModal(() => ({ ...data, open: true }));
	}, []);

	const handleUpdateDetailsModalClose = useCallback(() => {
		setUpdateDetailsModal((prev) => ({ ...prev, open: false }));
	}, []);

	return (
		<Context.Provider
			value={{
				handleUpdateDetailsModalOpen,
				handleUpdateDetailsModalClose,
			}}
		>
			{updateDetailsModal && updateDetailsModal.open && (
				<UpdateDetailsModal
					data={updateDetailsModal.data}
					open={updateDetailsModal.open}
					onClose={() => handleUpdateDetailsModalClose()}
				/>
			)}
			{children}
		</Context.Provider>
	);
};

export const useModalContext = () => useContext(Context);
