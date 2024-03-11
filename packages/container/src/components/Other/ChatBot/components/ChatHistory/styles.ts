import { Accordion, AccordionDetails, AccordionSummary, styled } from '@mui/material';

export const StyledChatHistory = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.palette.common.white,
	flexShrink: 0,
	overflow: 'hidden',
	visibility: 'hidden',
	pointerEvents: 'none',
	position: 'relative',
	boxShadow:
		'0px 2px 1px -1px rgba(61, 71, 82, 0.2), 0px 1px 1px rgba(61, 71, 82, 0.14), 0px 1px 3px rgba(61, 71, 82, 0.12)',
}));

export const StyledChatHistoryScroller = styled('div')(() => ({
	overflowY: 'auto',
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

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
	padding: `${theme.typography.pxToRem(6)} ${theme.typography.pxToRem(8)}`,
	minHeight: 0,
	borderTop: `1px solid ${theme.palette.divider}`,

	'&.Mui-expanded': {
		minHeight: 0,
	},

	'& .MuiAccordionSummary-content': {
		margin: 0,
		'&.Mui-expanded': {
			margin: 0,
		},
	},
}));

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
	padding: 0,
}));
