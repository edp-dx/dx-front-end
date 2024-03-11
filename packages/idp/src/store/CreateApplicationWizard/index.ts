import { create } from 'zustand';

import { CreateApplicationWizardStore } from './types';

export const useCreateApplicationWizardStore = create<CreateApplicationWizardStore>((set) => ({
	formRootNode: null,
	setFormRootNode: (value) => {
		set(() => ({
			formRootNode: value,
		}));
	},
	activeStepIndex: 0,
	setActiveStepIndex: (value) => {
		set(() => ({
			activeStepIndex: value,
		}));
	},
	lastCompletedStepIndex: null,
	setLastCompletedStepIndex: (value) => {
		set(() => ({
			lastCompletedStepIndex: value,
		}));
	},

	clearStore: () => {
		set(() => ({
			activeStepIndex: 0,
			lastCompletedStepIndex: null,
		}));
	},

	defaultValues: {
		search: '',
	},
	setDefaultValues: (value) => {
		set(() => ({
			defaultValues: value,
		}));
	},
}));
