import { TemplatesManagement } from '~/services/data/templateManagement/model';

export interface ViewTemplatesManagementProps {
	data: TemplatesManagement;
	open?: boolean;
	onClose?: () => void;
}
