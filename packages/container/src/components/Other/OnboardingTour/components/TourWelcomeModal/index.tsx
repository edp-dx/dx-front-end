import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	FormControlLabel,
	FormGroup,
	Typography,
	useTheme,
} from '@mui/material';
import programmersImage from 'public/assets/programmers.svg';
import React, { useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import { headerMenuList } from '~/components/Layout/Header/constants';
import { useHeaderStore } from '~/store/Header';
import { useOnboardingTourStore } from '~/store/OnboardingTour';

import { StyledMainContent, StyledMainImage } from './styles';

export const TourWelcomeModal = () => {
	const theme = useTheme();

	const {
		welcomeModal,
		setWelcomeModal,
		reminderTutorial,
		setReminderTutorial,
		mainTutorial,
		setMainTutorial,
	} = useOnboardingTourStore(
		(state) => ({
			welcomeModal: state.welcomeModal,
			setWelcomeModal: state.setWelcomeModal,
			reminderTutorial: state.reminderTutorial,
			setReminderTutorial: state.setReminderTutorial,
			mainTutorial: state.mainTutorial,
			setMainTutorial: state.setMainTutorial,
		}),
		shallow,
	);

	const { setMenuAnchors } = useHeaderStore(
		(state) => ({
			setMenuAnchors: state.setMenuAnchors,
		}),
		shallow,
	);

	const handleCloseModal = useCallback(() => {
		setWelcomeModal({
			...welcomeModal,
			open: false,
		});
	}, [setWelcomeModal, welcomeModal]);

	const handleSkipTour = useCallback(() => {
		handleCloseModal();

		setMainTutorial({
			...mainTutorial,
			skipped: true,
		});

		if (welcomeModal.showAgain || reminderTutorial.showedOnce) {
			return;
		}

		setReminderTutorial({
			...reminderTutorial,
			run: true,
			showedOnce: true,
		});

		setMenuAnchors({
			[headerMenuList.HELP_MENU]: reminderTutorial.refs.helpMenuButtonRef
				.current as HTMLButtonElement,
		});
	}, [
		handleCloseModal,
		mainTutorial,
		reminderTutorial,
		setMainTutorial,
		setMenuAnchors,
		setReminderTutorial,
		welcomeModal,
	]);

	const handleStartTour = useCallback(() => {
		handleCloseModal();

		setMainTutorial({
			...mainTutorial,
			started: true,
			run: true,
		});
	}, [handleCloseModal, mainTutorial, setMainTutorial]);

	const handleShowAgain = useCallback(
		(value: boolean) => {
			setWelcomeModal({
				...welcomeModal,
				// Since button says "Don't show it again" we flip value we get
				showAgain: !value,
			});
		},
		[setWelcomeModal, welcomeModal],
	);

	return (
		<>
			<Dialog open={welcomeModal.open} maxWidth={'sm'} fullWidth onClose={handleSkipTour}>
				<DialogContent sx={{ p: 0 }}>
					<StyledMainImage>
						<img src={programmersImage} alt='' />
					</StyledMainImage>
					<StyledMainContent>
						<Typography
							variant={'h5'}
							sx={{ mb: theme.typography.pxToRem(16) }}
							textAlign={'center'}
						>
							Experience your new Developer Portal
						</Typography>
						<Typography
							variant={'body2'}
							textAlign={'center'}
							sx={{ mb: theme.typography.pxToRem(16) }}
						>
							Whether you need help with code deploying, managing renewals, or
							engaging your teammates, get it here with all the tools you’ll need to
							hit the ground running. Your journey starts with a quite simple
							few-steps onboarding through Portal UI.
						</Typography>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										size={'small'}
										defaultChecked={!welcomeModal.showAgain}
										onChange={({
											target: { checked },
										}: React.ChangeEvent<HTMLInputElement>) => {
											handleShowAgain(checked);
										}}
									/>
								}
								label='Don’t show it again'
								sx={{
									justifyContent: 'center',
									color: theme.palette.text.secondary,
									m: 0,
								}}
							/>
						</FormGroup>
					</StyledMainContent>
				</DialogContent>
				<DialogActions
					sx={{
						paddingTop: 0,
						paddingBottom: theme.typography.pxToRem(32),
						justifyContent: 'center',
					}}
				>
					<Button size={'small'} onClick={handleSkipTour}>
						skip tour
					</Button>
					<Button size={'small'} variant={'contained'} onClick={handleStartTour}>
						Let’s start!
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
