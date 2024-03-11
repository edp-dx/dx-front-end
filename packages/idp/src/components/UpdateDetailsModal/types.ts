import { Application } from '~/services/data/applications/model';

export interface UpdateDetailsModalProps {
	data: Application;
	open?: boolean;
	onClose?: () => void;
}
