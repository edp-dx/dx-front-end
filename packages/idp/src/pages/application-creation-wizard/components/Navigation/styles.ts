import { Accordion, AccordionDetails, ListItem, ListItemIcon, styled } from '@mui/material';

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
	boxShadow: 'none',
	'& .MuiAccordionSummary-root': {
		padding: `${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(16)}`,

		'&.Mui-expanded': {
			minHeight: 'auto',
		},
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

export const StyledNavItem = styled(ListItem)(({ theme }) => ({
	padding: 0,
	gap: theme.typography.pxToRem(12),
}));

export const StyledNavItemIcon = styled(ListItemIcon)(() => ({
	minWidth: 'auto',
}));
