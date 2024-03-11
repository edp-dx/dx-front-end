import { RefObject } from 'react';

type RefNames<T extends string> = `${T}Ref`;

type ReminderTutorialRefNames = 'helpMenu' | 'helpMenuButton';
type MainTutorialRefNames = 'header' | 'search' | 'chatFab' | 'carousel';

type ReminderTutorialRefs = {
	[key in RefNames<ReminderTutorialRefNames>]?: RefObject<unknown>;
};

type MainTutorialRefs = {
	[key in RefNames<MainTutorialRefNames>]?: RefObject<unknown>;
};

export interface OnboardingTourStore {
	welcomeModal: {
		open: boolean;
		showAgain: boolean;
	};
	setWelcomeModal: (value: OnboardingTourStore['welcomeModal']) => void;

	reminderTutorial: {
		run: boolean;
		showedOnce: boolean;
		refs: ReminderTutorialRefs;
	};
	setReminderTutorial: (value: OnboardingTourStore['reminderTutorial']) => void;

	mainTutorial: {
		run: boolean;
		skipped: boolean;
		completed: boolean;
		started: boolean;
		refs: MainTutorialRefs;
	};
	setMainTutorial: (value: OnboardingTourStore['mainTutorial']) => void;
}
