import CloseIcon from '@mui/icons-material/Close';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { FC, ReactElement } from 'react';

import { WorkflowReportProps } from './types';

export const WorkflowReport: FC<WorkflowReportProps> = ({ open, onClose, data }): ReactElement => {
	const theme = useTheme();
	if (!data) {
		return <></>;
	}

	return (
		<>
			<Dialog open={open} onClose={onClose} maxWidth={'lgDefault'} fullWidth>
				<DialogTitle>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						spacing={4}
					>
						<Typography variant={'h4'}>Workflow Report</Typography>
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Stack>
				</DialogTitle>
				<Divider sx={{}} />
				<DialogContent>
					<Grid container columnSpacing={8} rowSpacing={4}></Grid>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center', mb: theme.typography.pxToRem(8) }}>
					<Button size={'large'} variant={'contained'} onClick={onClose}>
						Done
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
