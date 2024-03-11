import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { Box, ButtonBase, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { blueGrey } from '@mui/material/colors';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useDashboardStore } from '~/store/Dashboard';
import { Insight as InsightType } from '~/store/Dashboard/types';

import { StyledInsightArrow } from './styles';

export const Insight = (): ReactElement => {
	const theme = useTheme();
	const { widgets, activeInsightWidgetID, setActiveInsightWidgetID, slots } = useDashboardStore(
		(state) => ({
			widgets: state.widgets,
			slots: state.slots,
			setActiveWidgetID: state.setActiveWidgetID,
			activeInsightWidgetID: state.activeInsightWidgetID,
			setActiveInsightWidgetID: state.setActiveInsightWidgetID,
		}),
		shallow,
	);

	const activeWidgetInsights = useMemo(
		() => widgets.find((el) => el.id === activeInsightWidgetID)?.insights,
		[activeInsightWidgetID, widgets],
	);

	const isInsightsActive = useMemo(() => !!activeInsightWidgetID, [activeInsightWidgetID]);

	const [activeInsight, setActiveInsight] = useState<InsightType>(null);

	const activeInsightIndex = useMemo(
		() => activeWidgetInsights?.findIndex((el) => el.id === activeInsight?.id),
		[activeInsight?.id, activeWidgetInsights],
	);

	const handleSetPrevInsight = useCallback(() => {
		setActiveInsight(activeWidgetInsights[activeInsightIndex - 1]);
	}, [activeInsightIndex, activeWidgetInsights]);

	const handleSetNextInsight = useCallback(() => {
		setActiveInsight(activeWidgetInsights[activeInsightIndex + 1]);
	}, [activeInsightIndex, activeWidgetInsights]);

	const activeSlotIndex = useMemo(
		() => slots.active.findIndex((el) => el.widgetId === activeInsightWidgetID),
		[activeInsightWidgetID, slots],
	);

	useEffect(() => {
		if (!activeWidgetInsights || !activeWidgetInsights.length) {
			return;
		}

		setActiveInsight(activeWidgetInsights?.[0]);
	}, [activeWidgetInsights]);

	return (
		<Box
			sx={{
				position: 'relative',
				backgroundColor: isInsightsActive ? theme.palette.primary.focus : blueGrey['50'],
				borderRadius: theme.typography.pxToRem(4),
				minHeight: theme.typography.pxToRem(71),
				padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(
					10,
				)} ${theme.typography.pxToRem(9)} ${theme.typography.pxToRem(16)}`,
				boxSizing: 'border-box',
			}}
		>
			<Grid container columnSpacing={0} rowSpacing={1} sx={{ p: 0 }}>
				<Grid xs={12} sx={{ p: 0, mb: theme.typography.pxToRem(4) }}>
					<Stack direction={'row'} spacing={2} alignItems={'center'}>
						<LightbulbIcon
							sx={{
								color: isInsightsActive
									? theme.palette.info.light
									: blueGrey['300'],
							}}
						/>
						{isInsightsActive ? (
							<Typography color={theme.palette.info.light} fontWeight={500}>
								Insight Tip -{' '}
								<Typography component={'span'} color={'#013654'} fontWeight={500}>
									{activeInsight?.title}
								</Typography>
							</Typography>
						) : (
							<Typography color={blueGrey['300']} fontWeight={500}>
								Insight Tips
							</Typography>
						)}

						<Stack
							direction={'row'}
							spacing={4}
							alignItems={'center'}
							sx={{ ml: 'auto !important' }}
						>
							{activeWidgetInsights &&
							isInsightsActive &&
							activeWidgetInsights.length > 1 ? (
								<Stack direction={'row'} alignItems={'center'}>
									{activeInsightIndex + 1 > 1 ? (
										<ButtonBase disableRipple onClick={handleSetPrevInsight}>
											<ChevronLeftIcon
												sx={{ color: theme.palette.info.light }}
											/>
										</ButtonBase>
									) : null}
									<div>
										{(activeWidgetInsights && activeInsightIndex + 1) || 1}/
										{activeWidgetInsights.length}
									</div>
									{activeWidgetInsights &&
									activeInsightIndex + 1 < activeWidgetInsights.length ? (
										<ButtonBase disableRipple onClick={handleSetNextInsight}>
											<ChevronRightIcon
												sx={{ color: theme.palette.info.light }}
											/>
										</ButtonBase>
									) : null}
								</Stack>
							) : null}
							{isInsightsActive ? (
								<IconButton
									onClick={() => setActiveInsightWidgetID(null)}
									size={'small'}
									sx={{ p: theme.typography.pxToRem(2) }}
								>
									<CloseIcon />
								</IconButton>
							) : null}
						</Stack>
					</Stack>
				</Grid>
				<Grid xs={12} sx={{ p: `0 0 0 ${theme.typography.pxToRem(32)}` }}>
					{isInsightsActive ? (
						<Typography color={'#013654'}>{activeInsight?.description}</Typography>
					) : (
						<Typography color={blueGrey['500']}>
							To view our <strong>AI-generated insights</strong>, just click the{' '}
							<strong>“Bulb” button</strong> placed on the top-left corner of the
							selected widget.
						</Typography>
					)}
				</Grid>
			</Grid>
			{isInsightsActive ? (
				<StyledInsightArrow sx={{ left: activeSlotIndex === 0 ? 0 : '50%' }} />
			) : null}
		</Box>
	);
};
