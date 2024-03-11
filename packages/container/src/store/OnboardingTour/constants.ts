import { OnboardingTourStore } from '~/store/OnboardingTour/types';

export const LOCAL_STORAGE_KEY_ONBOARDING_TOUR = 'dx_onboarding_tour';

export const LS_PARSED_ONBOARDING_TOUR: Partial<OnboardingTourStore> = JSON.parse(
	localStorage.getItem(LOCAL_STORAGE_KEY_ONBOARDING_TOUR),
);

export const isWelcomeModalOpen = () => {
	if (LS_PARSED_ONBOARDING_TOUR === null) {
		return true;
	}

	if (LS_PARSED_ONBOARDING_TOUR.mainTutorial.completed) {
		return false;
	}

	return LS_PARSED_ONBOARDING_TOUR.welcomeModal.showAgain;
};

export const DEFAULT_VALUES: Readonly<Partial<OnboardingTourStore>> = {
	welcomeModal: {
		open: isWelcomeModalOpen(),
		showAgain:
			LS_PARSED_ONBOARDING_TOUR !== null
				? LS_PARSED_ONBOARDING_TOUR.welcomeModal.showAgain
				: true, // since we show onboarding modal by default
	},
	reminderTutorial: {
		run: false,
		showedOnce:
			LS_PARSED_ONBOARDING_TOUR !== null
				? LS_PARSED_ONBOARDING_TOUR.reminderTutorial.showedOnce
				: false,
		refs: {},
	},
	mainTutorial: {
		run: false,
		skipped:
			LS_PARSED_ONBOARDING_TOUR !== null
				? LS_PARSED_ONBOARDING_TOUR.mainTutorial.skipped
				: false,
		completed:
			LS_PARSED_ONBOARDING_TOUR !== null
				? LS_PARSED_ONBOARDING_TOUR.mainTutorial.completed
				: false,
		started:
			LS_PARSED_ONBOARDING_TOUR !== null
				? LS_PARSED_ONBOARDING_TOUR.mainTutorial.started
				: false,
		refs: {},
	},
};
