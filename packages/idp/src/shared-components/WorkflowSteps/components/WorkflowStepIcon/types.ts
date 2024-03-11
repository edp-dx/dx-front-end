export interface WorkflowStepIconProps {
	error: boolean;
	active: boolean;
	completed: boolean;
	pending: boolean;
	skipped: boolean;
	icon: number;
	tooltip?: string;
}
