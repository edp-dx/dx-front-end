import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Stack,
	Typography,
	styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';

export const StyledAccordion = styled(Accordion)(() => ({
	width: '100%',
	'&.Mui-expanded': { backgroundColor: grey[50] },
})) as typeof Accordion;

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
	position: 'relative',
	minHeight: `${theme.typography.pxToRem(48)}`,
	padding: `0 ${theme.typography.pxToRem(28)} 0 ${theme.typography.pxToRem(16)}`,

	'&.Mui-expanded': {
		minHeight: `${theme.typography.pxToRem(48)}`,
	},

	'& .MuiAccordionSummary-content': {
		maxWidth: `calc(100% - ${theme.typography.pxToRem(24)})`,

		'&.Mui-expanded': {
			margin: `${theme.typography.pxToRem(12)} 0`,
		},
	},
}));

export const StyledAccordionSummaryInner = styled(Stack)(({ theme }) => ({
	width: '100%',
	paddingRight: theme.typography.pxToRem(24),
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
	padding: `${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(
		16,
	)} ${theme.typography.pxToRem(24)}`,
}));

export const StyledAccordionTitle = styled(Typography)(({ theme }) => ({
	maxWidth: theme.typography.pxToRem(300),
	width: '100%',
	flexShrink: 0,
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
}));

export const StyledAccordionDescription = styled(Typography)(() => ({
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
}));
