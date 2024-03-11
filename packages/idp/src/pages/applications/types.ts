export enum ApplicationsTabsValues {
	Created,
	Onboarding,
}

export enum WorkflowCreationStatus {
	Incomplete,
	Complete,
}

export interface AlertConfig {
	severity: 'success' | 'error';
	text: string;
	title: string;
}
