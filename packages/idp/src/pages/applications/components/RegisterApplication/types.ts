import { WorkflowCreationStatus } from '../../types';

export interface RegisterApplicationProps {
	applicationNames: string[];
	gitRepoUrls: string[];
	onClose?: (workflowCreationStatus: WorkflowCreationStatus) => void;
}
