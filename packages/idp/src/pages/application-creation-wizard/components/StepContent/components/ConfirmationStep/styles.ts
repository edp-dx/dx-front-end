import { StepLabel, Stepper, styled } from '@mui/material';

export const StyledStepper = styled(Stepper)(({ theme }) => ({
	'& .MuiStepConnector-root': {
		marginLeft: theme.typography.pxToRem(6),
	},
	'& .MuiStepConnector-line': {
		borderLeftWidth: theme.typography.pxToRem(2),
	},
}));

export const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
	'& .MuiStepLabel-label': {
		fontSize: theme.typography.pxToRem(16),
	},
	'& .MuiStepLabel-labelContainer': {
		color: theme.palette.text.primary,
	},
	'& .MuiStepIcon-root': {
		width: theme.typography.pxToRem(12),
		height: theme.typography.pxToRem(12),
	},
	'& .MuiStepIcon-text': {
		display: 'none',
	},
}));
