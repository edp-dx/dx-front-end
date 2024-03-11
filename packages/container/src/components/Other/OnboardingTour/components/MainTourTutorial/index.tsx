import { Button, Pagination, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import Joyride, { ACTIONS, CallBackProps, Step, TooltipRenderProps } from 'react-joyride';
import { shallow } from 'zustand/shallow';
import { useOnboardingTourStore } from '~/store/OnboardingTour';
import { hiddenClassName } from '~/theme/globalStyles';

import { TourStep } from '../../components/TourStep';

export const MainTourTutorial = (): ReactElement => {
	const theme = useTheme();

	const { mainTutorial, setMainTutorial } = useOnboardingTourStore(
		(state) => ({
			mainTutorial: state.mainTutorial,
			setMainTutorial: state.setMainTutorial,
		}),
		shallow,
	);

	const tourRefsArray = Object.values(mainTutorial.refs);
	const allRefsAreMounted = useMemo(
		() => tourRefsArray.length && tourRefsArray.every((el) => Boolean(el.current)),
		[tourRefsArray],
	);

	const steps: Step[] = [
		{
			title: 'Top Bar Panel',
			content:
				'This upper panel provides easy access to everyday capabilities engineers use in their routine processes. Open your applications list and initiate a respective flow. The notification icon shows the number of most prioritized unread messages. The help icon provides access to detailed information about Developer Experience Portal. The user profile gives you a quick access to your settings, skills, etc.',
			target: mainTutorial.refs.headerRef?.current as HTMLElement,
			disableBeacon: true,
			placement: 'bottom',
		},

		{
			title: 'Enterprise Search',
			content:
				'This search field is a part of the search capability. It provides Google-like search through all sources of information at enterprise. Here engineers can search through text documentation, source code, communities, presentations, video and audio files. The search is based on your areas of interest, configured keywords and tags. Since the search uses AL/ML capabilities, you can use human languages to find technical stuff across all the enterprise knowledge.',
			target: mainTutorial.refs.searchRef?.current as HTMLElement,
			disableBeacon: true,
			placement: 'right',
		},

		{
			title: 'Online AI/ML Chat',
			content:
				'This interface provides access to our AI/ML chat bot where you can get responses to the most frequently asked questions. The bot answers your question, provides links to other capability pages, and searches for you via the enterprise search.',
			target: (mainTutorial.refs.chatFabRef?.current as HTMLElement)?.querySelector(
				'.MuiFab-root',
			) as HTMLElement,
			disableBeacon: true,
			placement: 'left',
		},

		{
			title: 'Сarousel: Capabilities Set',
			content:
				'This carousel is a container with the listed Developer Experience (DX) capabilities. The cards forward you to a capability page where engineers can start user flows and get more detailed information. All the DX capabilities are based on your enterprise systems/tools and leverage their capabilities. The DX extends the existing capabilities and provides seamless experience for engineers.',
			target: mainTutorial.refs.carouselRef?.current as HTMLElement,
			disableBeacon: true,
			placement: 'bottom',
		},
	];

	const [stepIndex, setStepIndex] = useState<number>(0);

	const handleStart = () => {
		document.body.classList.add(hiddenClassName);
	};

	const handleComplete = useCallback(() => {
		setMainTutorial({
			...mainTutorial,
			run: false,
			skipped: false,
			completed: true,
			started: false,
		});

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		document.body.classList.remove(hiddenClassName);
	}, [mainTutorial, setMainTutorial]);

	const handleStop = useCallback(() => {
		setMainTutorial({
			...mainTutorial,
			run: false,
			skipped: true,
			completed: false,
			started: true,
		});

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		document.body.classList.remove(hiddenClassName);
	}, [mainTutorial, setMainTutorial]);

	const handleJoyrideCallback = useCallback(
		(data: CallBackProps) => {
			const { action, index } = data;
			handleStart();

			if (action === ACTIONS.CLOSE) {
				handleStop();
			}

			if (action !== ACTIONS.STOP) {
				return;
			}

			if (index === steps.length - 1) {
				handleComplete();
			}

			handleStop();
		},
		[handleComplete, handleStop, steps.length],
	);

	const handleClickGoNext = useCallback(() => {
		setStepIndex((state) => state + 1);
	}, [setStepIndex]);

	const Tooltip = React.memo(function Tooltip({
		step,
		tooltipProps,
		isLastStep,
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
						<Pagination
							count={steps.length}
							color='primary'
							hideNextButton
							hidePrevButton
							page={stepIndex + 1}
							sx={{
								'& ul': { justifyContent: 'center' },
								mb: theme.typography.pxToRem(16),
							}}
							onChange={(event, number) => setStepIndex(number - 1)}
						/>
						{!isLastStep ? (
							<Grid container justifyContent={'center'}>
								<Grid>
									<Button size={'small'} onClick={handleStop}>
										stop
									</Button>
								</Grid>
								<Grid>
									<Button
										size={'small'}
										variant={'contained'}
										onClick={handleClickGoNext}
									>
										go next
									</Button>
								</Grid>
							</Grid>
						) : (
							<Grid container justifyContent={'center'}>
								<Grid>
									<Button
										size={'small'}
										variant={'contained'}
										onClick={handleComplete}
									>
										done
									</Button>
								</Grid>
							</Grid>
						)}
					</>
				</TourStep>
			</div>
		);
	});

	return (
		<>
			<Joyride
				callback={handleJoyrideCallback}
				run={mainTutorial.run}
				steps={allRefsAreMounted ? steps : []}
				styles={{
					options: {
						zIndex: theme.zIndex.modal,
					},
				}}
				stepIndex={stepIndex}
				tooltipComponent={Tooltip}
			/>
		</>
	);
};
