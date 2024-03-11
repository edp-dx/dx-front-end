import { TextField, styled } from '@mui/material';

export const StyledTextField = styled(TextField)(
	({ variant, theme }) =>
		variant === 'standard' && {
			pointerEvents: 'none',
			margin: `0 ${theme.typography.pxToRem(14)}`,

			'.MuiInput-root::before': {
				border: '0',
			},
		},
);
