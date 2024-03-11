import { Button, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { ReactElement, useCallback, useMemo } from 'react';
import Joyride, { CallBackProps, STATUS, Step, TooltipRenderProps } from 'react-joyride';
import { shallow } from 'zustand/shallow';
import { headerMenuList } from '~/components/Layout/Header/constants';
import { useHeaderStore } from '~/store/Header';
import { useOnboardingTourStore } from '~/store/OnboardingTour';

import { TourStep } from '../../components/TourStep';

export const ReminderTutorial = (): ReactElement => {
	const theme = useTheme();

	const { reminderTutorial, setReminderTutorial } = useOnboardingTourStore(
		(state) => ({
			reminderTutorial: state.reminderTutorial,
			setReminderTutorial: state.setReminderTutorial,
		}),
		shallow,
	);

	const { setMenuAnchors } = useHeaderStore(
		(state) => ({
			setMenuAnchors: state.setMenuAnchors,
		}),
		shallow,
	);

	const tourRefsArray = Object.values(reminderTutorial.refs);
	const allRefsAreMounted = useMemo(
		() => tourRefsArray.length && tourRefsArray.every((el) => Boolean(el.current)),
		[tourRefsArray],
	);

	const steps: Step[] = [
		{
			title: 'Just to Remind',
			content: 'Open the Portal Tour anytime by navigating to the Help menu.',
			target: (reminderTutorial.refs.helpMenuRef?.current as HTMLElement)?.querySelector(
				'.MuiMenu-paper',
			) as HTMLElement,
			disableBeacon: true,
			offset: 50,
			placement: 'left',
		},
	];

	const handleComplete = useCallback(() => {
		setReminderTutorial({
			...reminderTutorial,
			run: false,
			showedOnce: true,
		});

		setMenuAnchors({
			[headerMenuList.HELP_MENU]: null,
		});
	}, [reminderTutorial, setMenuAnchors, setReminderTutorial]);

	const handleJoyrideCallback = useCallback(
		({ status }: CallBackProps) => {
			if (status !== STATUS.FINISHED) {
				return;
			}
			handleComplete();
		},
		[handleComplete],
	);

	const Tooltip = React.memo(function Tooltip({
		step,
		tooltipProps,
	}: TooltipRenderProps): ReactElement {
		return (
			<div {...tooltipProps}>
				<TourStep>
					<>
						<Typography
							variant={'h5'}
							textAlign={'center'}
							sx={{ mb: theme.typography.pxToRem(16) }}
						>
							{step.title}
						</Typography>
						<Typography
							variant={'body2'}
							sx={{ mb: theme.typography.pxToRem(16) }}
							textAlign={'center'}
						>
							{step.content}
						</Typography>
						<Grid container justifyContent={'center'}>
							<Grid>
								<Button
									size={'small'}
									variant={'contained'}
									sx={{ minWidth: 'initial' }}
									onClick={handleComplete}
								>
									ok
								</Button>
							</Grid>
						</Grid>
					</>
				</TourStep>
			</div>
		);
	});

	return (
		<>
			<Joyride
				callback={handleJoyrideCallback}
				run={reminderTutorial.run}
				steps={allRefsAreMounted ? steps : []}
				styles={{
					options: {
						zIndex: theme.zIndex.modal,
					},
				}}
				tooltipComponent={Tooltip}
			/>
		</>
	);
};
