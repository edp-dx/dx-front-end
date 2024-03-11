import React, { ReactElement, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { useOnboardingTourStore } from '~/store/OnboardingTour';

import { MainTourTutorial } from './components/MainTourTutorial';
import { ReminderTutorial } from './components/ReminderTutorial';
import { TourWelcomeModal } from './components/TourWelcomeModal';

export const OnboardingTour = (): ReactElement => {
	const { reminderTutorial, setReminderTutorial, mainTutorial, setMainTutorial } =
		useOnboardingTourStore(
			(state) => ({
				reminderTutorial: state.reminderTutorial,
				mainTutorial: state.mainTutorial,
				setReminderTutorial: state.setReminderTutorial,
				setMainTutorial: state.setMainTutorial,
			}),
			shallow,
		);

	const helpMenuButtonRef = React.useRef<HTMLButtonElement>(null);
	const helpMenuRef = React.useRef<HTMLDivElement>(null);
	const headerRef = React.useRef<HTMLDivElement>(null);
	const searchRef = React.useRef<HTMLDivElement>(null);
	const chatFabRef = React.useRef<HTMLDivElement>(null);
	const carouselRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		setReminderTutorial({
			...reminderTutorial,
			refs: {
				helpMenuButtonRef: helpMenuButtonRef,
				helpMenuRef: helpMenuRef,
			},
		});

		setMainTutorial({
			...mainTutorial,
			refs: {
				headerRef: headerRef,
				searchRef: searchRef,
				chatFabRef: chatFabRef,
				carouselRef: carouselRef,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<TourWelcomeModal />
			<ReminderTutorial />
			<MainTourTutorial />
		</>
	);
};
