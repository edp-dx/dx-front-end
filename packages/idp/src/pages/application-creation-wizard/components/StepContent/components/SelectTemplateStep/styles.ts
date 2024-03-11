import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Stack,
	Typography,
	styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';

export const StyledStepContentHeader = styled(Stack)(({ theme }) => ({
	marginBottom: theme.typography.pxToRem(24),
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
	width: '100%',
	margin: `0 0 ${theme.typography.pxToRem(4)} 0`,
	'&.Mui-expanded': { margin: `0 0 ${theme.typography.pxToRem(4)} 0`, backgroundColor: grey[50] },
}));

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
	minHeight: theme.typography.pxToRem(48),
	padding: `0 ${theme.typography.pxToRem(28)} 0 ${theme.typography.pxToRem(16)}`,

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

export const StyledTable = styled('div')(() => ({
	'& .MuiTableRow-root': {
		cursor: 'pointer',
	},
	'& .MuiTableCell-root': {
		'&:first-of-type': {
			width: '40%',
		},
		'&:nth-of-type(2)': {
			width: '12%',
		},
	},
}));
