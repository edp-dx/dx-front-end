import { Application } from '~/services/data/applications/model';

export interface ApplicationDetailsProps {
	open: boolean;
	onClose: () => void;
	data: Application;
}
