import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { shallow } from 'zustand/shallow';
import { useDashboardStore } from '~/store/Dashboard';
import { WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';

import { CreateForm } from './components/CreateForm';
import { EditForm } from './components/EditForm';

export const WidgetModal = (): ReactElement => {
	const theme = useTheme();

	const {
		widgetModal,
		resetWidgetModal,
		setWidgetModalActiveStepIndex,
		setWidgetModalLastCompletedStepIndex,
	} = useDashboardStore(
		(state) => ({
			widgetModal: state.widgetModal,
			resetWidgetModal: state.resetWidgetModal,
			setWidgetModalActiveStepIndex: state.setWidgetModalActiveStepIndex,
			setWidgetModalLastCompletedStepIndex: state.setWidgetModalLastCompletedStepIndex,
		}),
		shallow,
	);

	const handleClose = () => {
		resetWidgetModal();
		setWidgetModalActiveStepIndex(0);
		setWidgetModalLastCompletedStepIndex(0);
	};

	return (
		<Dialog
			open={widgetModal.open}
			maxWidth={'sm'}
			fullWidth
			onClose={handleClose}
			keepMounted
			sx={{ '& .MuiDialog-paper': { minHeight: theme.typography.pxToRem(470) } }}
		>
			<DialogTitle>
				<Stack
					direction={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
					spacing={4}
				>
					<Typography variant={'h4'}>
						{widgetModal.mode === WIDGET_MODAL_MODE.CREATE
							? 'Add New Widget'
							: widgetModal.mode === WIDGET_MODAL_MODE.EDIT
							? 'Edit Widget'
							: ''}
					</Typography>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Divider sx={{ my: theme.typography.pxToRem(14) }} />
			</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
				<Stack spacing={4} flexGrow={1}>
					{widgetModal.mode === WIDGET_MODAL_MODE.CREATE ? (
						<CreateForm />
					) : widgetModal.mode === WIDGET_MODAL_MODE.EDIT ? (
						<EditForm />
					) : null}
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
