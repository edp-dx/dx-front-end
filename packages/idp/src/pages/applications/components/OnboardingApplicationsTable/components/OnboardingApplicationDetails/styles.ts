import { Dialog, Tab, styled } from '@mui/material';

export const StyledIcon = styled('img')(({ theme }) => ({
	width: theme.typography.pxToRem(22),
	height: theme.typography.pxToRem(22),
}));

export const ScrollableBox = styled('div')(({ theme }) => ({
	maxHeight: '144px',
	paddingRight: '5px',
	overflow: 'auto',
	'&::-webkit-scrollbar': {
		width: '15px',
	},
	'&::-webkit-scrollbar-track': {
		width: '15px',
		borderLeft: '1px solid #E7E7E7',
		background: theme.palette.background.default,
	},
	'&::-webkit-scrollbar-thumb': {
		height: '44px',
		border: '4px solid transparent',
		borderRadius: '10px',
		background: theme.palette.grey[400],
		backgroundClip: 'content-box',
	},
	'scrollbar-width': 'thin',
	'scrollbar-color': `${theme.palette.grey[400]} ${theme.palette.background.default}`,
}));

export const DisabledScrollableBox = styled(ScrollableBox)(({ theme }) => ({
	color: theme.palette.text.disabled,
}));

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

export const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': { minHeight: theme.typography.pxToRem(560) },
}));
