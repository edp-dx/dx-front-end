import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { ReactElement } from 'react';
import { shallow } from 'zustand/shallow';
import { ControlButton } from '~/components/ControlButton';
import { isActiveSlotMultiple, isActiveSlotSingle, useDashboardStore } from '~/store/Dashboard';
import { WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';

import { useControls } from '../../hooks/useControls';
import { Slot } from '../Slot';
import { StyledComparisonControls, StyledComparisonWrapper } from './styles';

export const Active = (): ReactElement => {
	const theme = useTheme();
	const { mode, slots, widgets, setWidgetModal } = useDashboardStore(
		(state) => ({
			mode: state.mode,
			slots: state.slots,
			widgets: state.widgets,
			setWidgetModal: state.setWidgetModal,
		}),
		shallow,
	);
	const handleOpenCreateModal = () => setWidgetModal(true, WIDGET_MODAL_MODE.CREATE);

	const {
		center: { center: centerControls },
	} = useControls();

	return (
		<Box display={'flex'} flexGrow={1} justifyContent={'center'} alignItems={'center'}>
			{widgets.length === 0 ? (
				<Box
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					sx={{
						padding: `${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(
							32,
						)} ${theme.typography.pxToRem(24)}`,
						maxWidth: theme.typography.pxToRem(600),
						width: '100%',
						border: `1px dashed ${theme.palette.divider}`,
						borderRadius: theme.shape.borderRadius,
					}}
				>
					<Box sx={{ mb: theme.typography.pxToRem(16) }}>
						<WarningAmberOutlinedIcon color={'primary'} />
					</Box>
					<Stack
						direction={'row'}
						alignItems={'center'}
						sx={{ mb: theme.typography.pxToRem(8) }}
						spacing={1}
					>
						<Typography variant={'body1'} color={theme.palette.text.primary}>
							There are no any widgets here.
						</Typography>
						<Link component='button' variant='body2' onClick={handleOpenCreateModal}>
							<Typography>Click to Add New Widget</Typography>
						</Link>
					</Stack>
					<Typography variant={'body2'} color={theme.palette.text.secondary}>
						(You’ll be provided with the Creation Dashboard Wizard)
					</Typography>
				</Box>
			) : isActiveSlotSingle(slots.active, mode) ? (
				<Slot slot={slots.active[0]} isActive />
			) : isActiveSlotMultiple(slots.active, mode) ? (
				<StyledComparisonWrapper>
					<Grid container spacing={2.5} sx={{ p: 0 }}>
						{slots.active.map((slot, idx) => {
							const key = `slot::${idx}`;

							return (
								<Grid key={key} xs={6}>
									<Slot slot={slot} isActive />
								</Grid>
							);
						})}
					</Grid>
					<StyledComparisonControls>
						<Stack spacing={0.25}>
							{centerControls.map(
								({ handler, visible, icon, tooltip, disabled }, idx) => {
									const key = `control-center-center::${idx}`;
									return (
										<ControlButton
											key={key}
											visible={visible}
											handler={handler}
											icon={icon}
											tooltip={tooltip}
											disabled={disabled}
										/>
									);
								},
							)}
						</Stack>
					</StyledComparisonControls>
				</StyledComparisonWrapper>
			) : null}
		</Box>
	);
};
