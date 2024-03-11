import { Box, Link, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { blueGrey } from '@mui/material/colors';
import React, { FC, ReactElement, useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { ControlButton } from '~/components/ControlButton';
import { useDashboardStore } from '~/store/Dashboard';
import { VIEW_MODE } from '~/store/Dashboard/constants';

import { SLOT_WRAPPER_HEIGHT } from '../../constants';
import { useControls } from '../../hooks/useControls';
import {
	StyledSlot,
	StyledSlotBottomControls,
	StyledSlotControls,
	StyledSlotImageWrapper,
	StyledSlotUpperControls,
	StyledSlotWidgetExplanation,
	StyledSlotWidgetExplanationFade,
} from './styles';
import { SlotProps } from './types';

export const Slot: FC<SlotProps> = ({ slot, isActive = false }): ReactElement => {
	const theme = useTheme();
	const { mode, widgets, activeInsightWidgetID, activeWidgetExplanationWidgetsIDS } =
		useDashboardStore(
			(state) => ({
				widgets: state.widgets,
				mode: state.mode,
				activeInsightWidgetID: state.activeInsightWidgetID,
				activeWidgetExplanationWidgetsIDS: state.activeWidgetExplanationWidgetsIDS,
			}),
			shallow,
		);

	const widget = useMemo(() => widgets.find((el) => el.id === slot.widgetId), [slot, widgets]);
	const imageSrc = useMemo(() => {
		if (!isActive) {
			return widget?.imageFull;
		}

		if (mode === VIEW_MODE.COMPARISON) {
			return widget?.imageHalf;
		} else {
			return widget?.imageFull;
		}
	}, [isActive, mode, widget?.imageFull, widget?.imageHalf]);

	const {
		up: { left: upLeft, center: upCenter, right: upRight },
		bottom: { left: bottomLeft, right: bottomRight },
	} = useControls(widget, isActive);

	const isWidgetInsightActive = useMemo(
		() => !!activeInsightWidgetID && activeInsightWidgetID === slot.widgetId,
		[activeInsightWidgetID, slot.widgetId],
	);

	const isWidgetExplanationActive = useMemo(
		() =>
			activeWidgetExplanationWidgetsIDS &&
			activeWidgetExplanationWidgetsIDS.length &&
			activeWidgetExplanationWidgetsIDS.includes(slot.widgetId),
		[activeWidgetExplanationWidgetsIDS, slot.widgetId],
	);

	return (
		<>
			<StyledSlot
				sx={{
					border: `1px solid ${
						isWidgetInsightActive ? theme.palette.info.light : blueGrey['300']
					}`,
					height: isActive ? theme.typography.pxToRem(SLOT_WRAPPER_HEIGHT) : 'auto',
				}}
			>
				{isActive ? (
					<Box
						sx={{
							padding: `${theme.typography.pxToRem(9)} ${theme.typography.pxToRem(
								12,
							)} ${theme.typography.pxToRem(1)}`,
						}}
					>
						<Typography variant={'h6'} color={theme.palette.text.primary}>
							{widget?.name}
						</Typography>
					</Box>
				) : (
					<Box sx={{ pl: theme.typography.pxToRem(4) }}>
						<Typography variant={'subtitle2'} color={theme.palette.text.primary}>
							{widget?.name}
						</Typography>
					</Box>
				)}

				<StyledSlotImageWrapper>
					{isActive ? (
						<Tooltip
							title={`Click to open ${widget?.source} in a new tab`}
							enterDelay={800}
							enterNextDelay={800}
							placement={'top'}
							followCursor
							arrow
						>
							<Link
								href={widget?.href || '#'}
								target={'_blank'}
								sx={{ display: 'block' }}
							>
								<img src={imageSrc} alt='' />
							</Link>
						</Tooltip>
					) : (
						<img src={imageSrc} alt='' />
					)}
					{isWidgetExplanationActive ? (
						<StyledSlotWidgetExplanation>
							<Typography
								variant={'subtitle2'}
								color={theme.palette.primary.main}
								sx={{ mb: theme.typography.pxToRem(8) }}
							>
								Widget Metrics Explanation
							</Typography>
							{widget.widgetExplanation &&
								widget.widgetExplanation.length &&
								widget.widgetExplanation.map((explanation, idx) => {
									const key = `explanation::${idx}`;

									return (
										<Box key={key} sx={{ mb: theme.typography.pxToRem(32) }}>
											<Typography
												variant={'h6'}
												color={theme.palette.text.primary}
											>
												{explanation.heading}
											</Typography>
											<Typography
												variant={'body1'}
												color={theme.palette.text.secondary}
												dangerouslySetInnerHTML={{
													__html: explanation.content.replaceAll(
														'\n',
														'<br>',
													),
												}}
											/>
										</Box>
									);
								})}
						</StyledSlotWidgetExplanation>
					) : null}
				</StyledSlotImageWrapper>
				{isWidgetExplanationActive ? <StyledSlotWidgetExplanationFade /> : null}
				<StyledSlotControls
					className={'slot-controls'}
					sx={{ opacity: isWidgetExplanationActive || isWidgetInsightActive ? 1 : 0 }}
				>
					<StyledSlotUpperControls>
						<Grid
							container
							alignItems={'center'}
							justifyContent={'space-between'}
							sx={{ p: 0 }}
						>
							<Grid xs={4}>
								<Stack
									direction={'row'}
									justifyContent={'flex-start'}
									spacing={0.25}
								>
									{upLeft.map(
										(
											{
												handler,
												visible,
												icon,
												tooltip,
												disabled,
												buttonProps,
											},
											idx,
										) => {
											const key = `control-up-left::${idx}`;
											return (
												<ControlButton
													key={key}
													visible={visible}
													handler={handler}
													icon={icon}
													tooltip={tooltip}
													disabled={disabled}
													buttonProps={buttonProps}
												/>
											);
										},
									)}
								</Stack>
							</Grid>
							<Grid xs={4}>
								<Stack direction={'row'} justifyContent={'center'} spacing={0.25}>
									{upCenter.map(
										(
											{
												handler,
												visible,
												icon,
												tooltip,
												disabled,
												buttonProps,
											},
											idx,
										) => {
											const key = `control-up-left::${idx}`;
											return (
												<ControlButton
													key={key}
													visible={visible}
													handler={handler}
													icon={icon}
													tooltip={tooltip}
													disabled={disabled}
													buttonProps={buttonProps}
												/>
											);
										},
									)}
								</Stack>
							</Grid>
							<Grid xs={4}>
								<Stack direction={'row'} justifyContent={'flex-end'} spacing={0.25}>
									{upRight.map(
										(
											{
												handler,
												visible,
												icon,
												tooltip,
												disabled,
												buttonProps,
											},
											idx,
										) => {
											const key = `control-up-right::${idx}`;

											return (
												<ControlButton
													key={key}
													visible={visible}
													handler={handler}
													icon={icon}
													tooltip={tooltip}
													disabled={disabled}
													buttonProps={buttonProps}
												/>
											);
										},
									)}
								</Stack>
							</Grid>
						</Grid>
					</StyledSlotUpperControls>
					<StyledSlotBottomControls>
						<Grid container alignItems={'center'} sx={{ p: 0 }}>
							<Grid xs={6}>
								<Stack
									direction={'row'}
									justifyContent={'flex-start'}
									spacing={0.25}
								>
									{bottomLeft.map(
										(
											{
												handler,
												visible,
												icon,
												tooltip,
												disabled,
												buttonProps,
											},
											idx,
										) => {
											const key = `control-bottom-left::${idx}`;

											return (
												<ControlButton
													key={key}
													visible={visible}
													handler={handler}
													icon={icon}
													tooltip={tooltip}
													disabled={disabled}
													buttonProps={buttonProps}
												/>
											);
										},
									)}
								</Stack>
							</Grid>
							<Grid xs={6}>
								<Stack direction={'row'} justifyContent={'flex-end'} spacing={0.25}>
									{bottomRight.map(
										(
											{
												handler,
												visible,
												icon,
												tooltip,
												disabled,
												buttonProps,
											},
											idx,
										) => {
											const key = `control-bottom-right::${idx}`;

											return (
												<ControlButton
													key={key}
													visible={visible}
													handler={handler}
													icon={icon}
													tooltip={tooltip}
													disabled={disabled}
													buttonProps={buttonProps}
												/>
											);
										},
									)}
								</Stack>
							</Grid>
						</Grid>
					</StyledSlotBottomControls>
				</StyledSlotControls>
			</StyledSlot>
		</>
	);
};
