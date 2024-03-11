import { OnboardingApplication } from '~/services/data/workflows/model';

export interface OnboardingTableItemActionsProps {
	data: OnboardingApplication;
	onWorkflowDeleteConfirm: (appName: string) => void;
}
