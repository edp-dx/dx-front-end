import WarningIcon from '@mui/icons-material/Warning';
import { Button, Dialog, DialogContent, Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

import { AlertModalProps } from './types';

export const AlertModal: React.FC<AlertModalProps> = (props) => {
	const { name, text, open, onClose, handleConfirm, cancelButton, confirmButton } = props;
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
						{name}
					</Typography>
					<Typography
						variant={'body2'}
						color={theme.palette.text.secondary}
						sx={{ mb: theme.typography.pxToRem(16) }}
						textAlign={'center'}
					>
						{text}
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
							{cancelButton}
						</Button>
						<Button onClick={handleConfirm} variant={'contained'}>
							{confirmButton}
						</Button>
					</Stack>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
