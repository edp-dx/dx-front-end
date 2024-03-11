import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
	width: theme.typography.pxToRem(160),
}));

export const StyledRegisterButton = styled(Button)(({ theme }) => ({
	color: theme.palette.text.primary,
	borderColor: 'currentcolor',
	whiteSpace: 'nowrap',
	fontWeight: 500,

	'&:hover': {
		color: theme.palette.primary.main,
	},
}));
