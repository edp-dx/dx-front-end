import WarningIcon from '@mui/icons-material/Warning';
import { Button, Dialog, DialogContent, Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

import { DeleteModalProps } from './types';

export const DeleteModal: React.FC<DeleteModalProps> = (props) => {
	const { name, open, onClose, handleConfirm } = props;
	const theme = useTheme();

	return (
		<Dialog open={open} maxWidth={'xs'} fullWidth onClose={onClose}>
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
						You are going to delete the{' '}
						<Typography component={'span'} color={theme.palette.text.primary}>
							{name}
						</Typography>{' '}
						from the current list.
						<br />
						Please be assured that all associated results and data will be preserved and
						remain accessible from the Application Details menu.
					</Typography>
					<Stack
						direction={'row'}
						alignItems={'center'}
						spacing={2}
						justifyContent={'flex-end'}
					>
						<Button
							onClick={onClose}
							color={'inherit'}
							sx={{ color: theme.palette.action.disabled }}
						>
							No, Cancel
						</Button>
						<Button onClick={handleConfirm} variant={'contained'}>
							Yes, I confirm
						</Button>
					</Stack>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
