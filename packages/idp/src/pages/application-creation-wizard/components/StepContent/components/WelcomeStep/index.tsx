import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import React, { Fragment, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { shallow } from 'zustand/shallow';
import { REQUEST_KEY_GET_TEMPLATE_CATEGORIES } from '~/services/data/categories/requestKeys';
import { useCreateApplicationWizardStore } from '~/store/CreateApplicationWizard';

import { VideoGallery } from './components/VideoGallery';
import { useSteps } from './hooks/useSteps';

export const WelcomeStep = () => {
	const theme = useTheme();
	const steps = useSteps();
	const queryClient = useQueryClient();
	const { activeStepIndex, setActiveStepIndex, setLastCompletedStepIndex } =
		useCreateApplicationWizardStore(
			(state) => ({
				activeStepIndex: state.activeStepIndex,
				setActiveStepIndex: state.setActiveStepIndex,
				setLastCompletedStepIndex: state.setLastCompletedStepIndex,
			}),
			shallow,
		);

	const handleClickNext = useCallback(() => {
		setLastCompletedStepIndex(activeStepIndex);
		setActiveStepIndex(activeStepIndex + 1);

		queryClient.invalidateQueries({
			queryKey: [REQUEST_KEY_GET_TEMPLATE_CATEGORIES],
		});
	}, [activeStepIndex, queryClient, setActiveStepIndex, setLastCompletedStepIndex]);

	return (
		<>
			<Box
				sx={{
					mb: theme.typography.pxToRem(24),
				}}
			>
				<VideoGallery />
			</Box>
			<Typography variant={'h5'} sx={{ mb: theme.typography.pxToRem(10) }}>
				Application Creation Flow
			</Typography>
			<Typography variant={'body2'}>
				Build your application following three simple steps.
			</Typography>
			<Divider sx={{ mt: theme.typography.pxToRem(10), mb: theme.typography.pxToRem(24) }} />
			<Stack
				direction={'row'}
				alignItems={'flex-start'}
				sx={{ mb: theme.typography.pxToRem(46) }}
			>
				{steps.map(({ label, description, index }, idx) => {
					const key = `${label}::${idx}`;

					return (
						<Fragment key={key}>
							{idx !== 0 ? (
								<Divider
									sx={{
										mx: theme.typography.pxToRem(8),
										my: theme.typography.pxToRem(12),
										flexGrow: 1,
									}}
								/>
							) : null}
							<Box sx={{ maxWidth: theme.typography.pxToRem(195), width: '100%' }}>
								<Stack direction={'row'} spacing={2}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											lineHeight: 0,
											flexShrink: 0,
											borderRadius: '50%',
											width: theme.typography.pxToRem(24),
											height: theme.typography.pxToRem(24),
											backgroundColor: theme.palette.primary.main,
											color: theme.palette.common.white,
										}}
									>
										{index}
									</Box>
									<Stack>
										<Typography variant={'subtitle2'}>{label}</Typography>
										<Typography variant={'caption'}>{description}</Typography>
									</Stack>
								</Stack>
							</Box>
						</Fragment>
					);
				})}
			</Stack>
			<Stack
				direction={'row'}
				justifyContent={'flex-end'}
				sx={{ mt: 'auto', pt: theme.typography.pxToRem(16) }}
			>
				<Button size={'large'} variant={'contained'} onClick={handleClickNext}>
					Next
				</Button>
			</Stack>
		</>
	);
};
