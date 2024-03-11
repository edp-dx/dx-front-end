export interface DeleteModalProps {
	name: string;
	text: string;
	open?: boolean;
	onClose?: () => void;
	handleConfirm: () => void;
}
