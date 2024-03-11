export interface CreateApplicationWizardStore {
	formRootNode: HTMLFormElement;
	setFormRootNode: (value: HTMLFormElement) => void;

	activeStepIndex: number;
	setActiveStepIndex: (value: number) => void;

	lastCompletedStepIndex: number | null;
	setLastCompletedStepIndex: (value: number) => void;

	clearStore: () => void;

	defaultValues: any;
	setDefaultValues: (value: any) => void;
}
