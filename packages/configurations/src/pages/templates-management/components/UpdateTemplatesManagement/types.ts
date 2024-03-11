import { TemplatesManagement } from '~/services/data/templateManagement/model';

export interface UpdateTemplatesManagementProps {
	data: TemplatesManagement;
	open?: boolean;
	onClose?: () => void;
}
