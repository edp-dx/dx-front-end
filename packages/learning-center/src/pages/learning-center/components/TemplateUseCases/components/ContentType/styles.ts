import { styled } from '@mui/material';

export const StyledImg = styled('img')(() => ({
	width: '100%',
}));

export const StyledTypography = styled('div')(() => ({
	marginTop: 'auto',
	marginBottom: 'auto',
	display: 'flex',
	flexDirection: 'column',

	'& img': {
		maxWidth: '100%',
		marginTop: 24,
	},
}));
