import { FormControlLabel, styled } from '@mui/material';

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	width: '100%',
	height: '100%',

	'& .MuiFormControlLabel-label': {
		width: '100%',
		height: '100%',
		borderRadius: theme.shape.borderRadius,
		border: '2px solid transparent',
	},
	'& .MuiRadio-root': {
		'&.Mui-checked ~ .MuiFormControlLabel-label': {
			border: `2px solid ${theme.palette.info.light}`,
		},
	},
}));

export const StyledIcon = styled('img')(({ theme }) => ({
	width: theme.typography.pxToRem(24),
	height: theme.typography.pxToRem(24),
	borderRadius: '50%',
	overflow: 'hidden',
	lineHeight: 0,
}));
