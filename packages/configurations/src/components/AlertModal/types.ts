import { ReactNode } from 'react';

export interface AlertModalProps {
	name: string;
	text: ReactNode | string;
	open?: boolean;
	onClose?: () => void;
	handleConfirm: () => void;
	confirmButton: string;
	cancelButton: string;
}
