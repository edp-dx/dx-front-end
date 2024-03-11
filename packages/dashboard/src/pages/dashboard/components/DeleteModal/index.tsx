import WarningIcon from '@mui/icons-material/Warning';
import { Button, Dialog, DialogContent, Divider, Stack, Typography, useTheme } from '@mui/material';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { useDashboardStore } from '~/store/Dashboard';

export const DeleteModal = (): ReactElement => {
	const theme = useTheme();
	const {
		slots,
		widgets,
		activeWidgetID,
		setActiveWidgetID,
		deleteWidget,
		widgetDeleteModalOpen,
		setWidgetDeleteModalOpen,
	} = useDashboardStore(
		(state) => ({
			slots: state.slots,
			widgets: state.widgets,
			activeWidgetID: state.activeWidgetID,
			setActiveWidgetID: state.setActiveWidgetID,
			deleteWidget: state.deleteWidget,
			widgetDeleteModalOpen: state.widgetDeleteModalOpen,
			setWidgetDeleteModalOpen: state.setWidgetDeleteModalOpen,
		}),
		shallow,
	);

	const handleClose = useCallback(
		() => setWidgetDeleteModalOpen(false),
		[setWidgetDeleteModalOpen],
	);

	const widgetToDelete = useMemo(
		() => widgets.find((el) => el.id === activeWidgetID),
		[activeWidgetID, widgets],
	);

	const isActive = useMemo(
		() => !!slots.active.find((el) => el.widgetId === widgetToDelete?.id),
		[slots.active, widgetToDelete?.id],
	);

	const handleConfirm = useCallback(() => {
		deleteWidget(widgetToDelete?.id, isActive);
		setActiveWidgetID(null);
		handleClose();
	}, [deleteWidget, widgetToDelete?.id, isActive, setActiveWidgetID, handleClose]);

	return (
		<Dialog open={widgetDeleteModalOpen} maxWidth={'xs'} fullWidth onClose={handleClose}>
			<DialogContent>
				<Stack alignItems={'center'}>
					<WarningIcon
						color={'warning'}
						sx={{
							width: theme.typography.pxToRem(48),
							height: theme.typography.pxToRem(48),
						}}
					/>
					<Divider
						sx={{
							width: '100%',
							mt: theme.typography.pxToRem(8),
							mb: theme.typography.pxToRem(16),
						}}
					/>
					<Typography
						variant={'h5'}
						sx={{ mb: theme.typography.pxToRem(16) }}
						textAlign={'center'}
					>
						Are you sure?
					</Typography>
					<Typography
						variant={'body2'}
						color={theme.palette.text.secondary}
						sx={{ mb: theme.typography.pxToRem(16) }}
						textAlign={'center'}
					>
						You are going to remove the{' '}
						<Typography component={'span'} color={theme.palette.text.primary}>
							{widgetToDelete?.name}
						</Typography>{' '}
						widget from your dashboard. To confirm it, click the REMOVE button.
					</Typography>
					<Stack
						direction={'row'}
						alignItems={'center'}
						spacing={2}
						justifyContent={'flex-end'}
					>
						<Button
							onClick={handleClose}
							color={'inherit'}
							sx={{ color: theme.palette.action.disabled }}
						>
							Don’t remove
						</Button>
						<Button onClick={handleConfirm} variant={'contained'}>
							Remove
						</Button>
					</Stack>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
