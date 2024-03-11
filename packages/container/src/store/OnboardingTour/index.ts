import { create } from 'zustand';

import { DEFAULT_VALUES, LOCAL_STORAGE_KEY_ONBOARDING_TOUR } from './constants';
import { OnboardingTourStore } from './types';

export const useOnboardingTourStore = create<OnboardingTourStore>((set) => ({
	welcomeModal: DEFAULT_VALUES.welcomeModal,
	setWelcomeModal: (value) => {
		set((state) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { refs: _reminderTutorialRefs, ...reminderTutorialPropsWithNoRefs } =
				state.reminderTutorial;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { refs: _mainTutorialRefs, ...mainTutorialPropsWithNoRefs } = state.mainTutorial;

			const newLocalStorageState = {
				welcomeModal: value,
				reminderTutorial: {
					...reminderTutorialPropsWithNoRefs,
				},
				mainTutorial: {
					...mainTutorialPropsWithNoRefs,
				},
			};

			localStorage.setItem(
				LOCAL_STORAGE_KEY_ONBOARDING_TOUR,
				JSON.stringify(newLocalStorageState),
			);

			return {
				welcomeModal: value,
			};
		});
	},

	reminderTutorial: DEFAULT_VALUES.reminderTutorial,
	setReminderTutorial: (value) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { refs, ...reminderTutorialPropsWithNoRefs } = value; // since value can have refs, we do not want to store refs in localStorage

		set((state) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { refs: _mainTutorialRefs, ...mainTutorialPropsWithNoRefs } = state.mainTutorial;

			const newLocalStorageState = {
				...state,
				reminderTutorial: {
					...reminderTutorialPropsWithNoRefs,
				},
				mainTutorial: {
					...mainTutorialPropsWithNoRefs,
				},
			};

			localStorage.setItem(
				LOCAL_STORAGE_KEY_ONBOARDING_TOUR,
				JSON.stringify(newLocalStorageState),
			);

			return {
				reminderTutorial: value,
			};
		});
	},

	mainTutorial: DEFAULT_VALUES.mainTutorial,
	setMainTutorial: (value) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { refs, ...mainTutorialPropsWithNoRefs } = value; // since value can have refs, we do not want to store refs in localStorage

		set((state) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { refs: _reminderTutorialRefs, ...reminderTutorialPropsWithNoRefs } =
				state.reminderTutorial;

			const newLocalStorageState = {
				...state,
				reminderTutorial: {
					...reminderTutorialPropsWithNoRefs,
				},
				mainTutorial: {
					...mainTutorialPropsWithNoRefs,
				},
			};

			localStorage.setItem(
				LOCAL_STORAGE_KEY_ONBOARDING_TOUR,
				JSON.stringify(newLocalStorageState),
			);

			return {
				mainTutorial: value,
			};
		});
	},
}));
