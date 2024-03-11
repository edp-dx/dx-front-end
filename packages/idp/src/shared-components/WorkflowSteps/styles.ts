import { StepLabel, styled } from '@mui/material';

export const StyledLink = styled('a')(() => ({
	textDecoration: 'none',
}));

export const StyledLabel = styled('p')(({ theme }) => ({
	margin: 0,
	color: theme.palette.text.primary,
	fontSize: '14px',
	fontWeight: 500,
	'&:hover': {
		color: theme.palette.primary.main,
	},
}));

export const StyledStepLabel = styled(StepLabel)(() => ({
	'& .MuiStepLabel-iconContainer': {
		paddingRight: 0,
	},
}));
