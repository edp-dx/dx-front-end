import { StepStatus, WorkflowStep } from '~/services/data/workflows/model';

export const getActiveStep = (steps: Array<WorkflowStep>) => {
	let activeStep = steps.indexOf(
		steps.find(
			(step) => step.status === StepStatus.InProgress || step.status === StepStatus.Failed,
		),
	);
	if (activeStep === -1) {
		steps.forEach((step, index) => {
			if (step.status === StepStatus.Finished) {
				activeStep = index;
			}
		});
	}
	return activeStep;
};

export const getStatuses = (status: StepStatus) => {
	return {
		pending: status === StepStatus.Created,
		active: status === StepStatus.InProgress,
		completed: status === StepStatus.Finished,
		error: status === StepStatus.Failed,
		skipped: status === StepStatus.Skipped,
	};
};

export const shouldDisplayLabel = (activeStep: number, index: number) => activeStep === index;

const FULL_LABEL_STATUSES = new Map<StepStatus, string>([[StepStatus.Failed, ' - Failed!']]);

const TOOLTIP_STATUSES = new Map<StepStatus, string>([[StepStatus.Skipped, ' - Skipped']]);

export const getStepFullLabel = (status: StepStatus, stepName = '') =>
	`${stepName}${FULL_LABEL_STATUSES.get(status) || ''}`;
export const getStepTooltip = (status: StepStatus, stepName = '') =>
	`${stepName}${TOOLTIP_STATUSES.get(status) || ''}`;
