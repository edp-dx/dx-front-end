import { Accordion, AccordionDetails, Box, IconButton, styled } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';

export const StyledChatHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	height: theme.typography.pxToRem(44),
	padding: theme.typography.pxToRem(8),
	backgroundColor: theme.palette.common.white,
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledChatContainer = styled('div')(() => ({
	height: '100%',
	overflowY: 'auto',
	overflowX: 'hidden',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: grey['100'],
}));

export const StyledChatBody = styled('div')(() => ({
	display: 'flex',
	overflow: 'hidden',
	flexGrow: 1,
}));

export const StyledChatButton = styled(IconButton)(({ theme }) => ({
	borderRadius: theme.typography.pxToRem(4),
	padding: theme.typography.pxToRem(4),
}));

export const StyledChatMessagesList = styled('div')(({ theme }) => ({
	padding: `${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(
		16,
	)} ${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(16)}`,
	overflowY: 'auto',
	marginBottom: theme.typography.pxToRem(5),
	flexGrow: 1,
}));

export const StyledChatBottomPanel = styled(Box)(({ theme }) => ({
	marginTop: 'auto',
	padding: theme.typography.pxToRem(8),
	backgroundColor: theme.palette.common.white,
}));

export const StyledFormTextField = styled(Box)(({ theme }) => ({
	flexGrow: 1,

	'& .MuiInputBase-input': {
		padding: `${theme.typography.pxToRem(6)} ${theme.typography.pxToRem(14)}`,
		height: theme.typography.pxToRem(36),
		boxSizing: 'border-box',
	},
}));

export const StyledLoadingDot = styled('div')(({ theme }) => ({
	width: theme.typography.pxToRem(8),
	height: theme.typography.pxToRem(8),
	borderRadius: '50%',
	display: 'inline-block',
	backgroundColor: blueGrey['400'],

	'&:nth-last-child(1)': {
		marginLeft: theme.typography.pxToRem(5),
		animation: 'loading .6s .3s linear infinite',
	},
	'&:nth-last-child(2)': {
		marginLeft: theme.typography.pxToRem(5),
		animation: 'loading .6s .2s linear infinite',
	},
	'&:nth-last-child(3)': {
		animation: 'loading .6s .1s linear infinite',
	},

	'@keyframes loading': {
		'0%': {
			transform: 'translate(0, 0)',
		},
		'25%': {
			transform: 'translate(0, -3px)',
		},
		'50%': {
			transform: 'translate(0, 0)',
		},
		'75%': {
			transform: 'translate(0, 3px)',
		},
		'100%': {
			transform: 'translate(0, 0)',
		},
	},
}));

export const StyledAccordion = styled(Accordion)(() => ({
	width: '100%',
	boxShadow: 'none',

	'&.Mui-expanded': {
		margin: 0,
	},

	'&::before': {
		content: 'none',
	},
}));

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
	padding: 0,
}));
