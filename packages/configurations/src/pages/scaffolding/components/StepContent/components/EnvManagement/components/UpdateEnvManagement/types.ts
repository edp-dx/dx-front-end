import { EnvManagement } from '~/services/data/envManagement/model';

export interface UpdateEnvManagementProps {
	data: EnvManagement;
	open?: boolean;
	onClose?: () => void;
}
