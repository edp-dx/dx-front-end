import { Tab, styled } from '@mui/material';

export const StyledTab = styled(Tab)(({ theme }) => ({
	color: theme.palette.text.secondary,
	textTransform: 'uppercase',
	lineHeight: theme.typography.pxToRem(24),
	padding: `${theme.typography.pxToRem(9)} ${theme.typography.pxToRem(16)}`,

	'&.MuiButtonBase-root.Mui-selected': {
		color: theme.palette.primary.main,
		backgroundColor: 'transparent',
	},
}));
