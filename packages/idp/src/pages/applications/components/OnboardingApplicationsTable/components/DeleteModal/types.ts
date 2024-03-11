export interface DeleteModalProps {
	name: string;
	open?: boolean;
	onClose?: () => void;
	handleConfirm: () => void;
}
