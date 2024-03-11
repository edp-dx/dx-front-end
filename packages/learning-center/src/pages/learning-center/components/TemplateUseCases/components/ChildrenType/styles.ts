import { Typography, styled } from '@mui/material';

export const StyledImg = styled('img')(() => ({
	width: '100%',
}));

export const StyledTypography = styled('div')(() => ({
	marginTop: 'auto',
	marginBottom: 'auto',

	'& img': {
		maxWidth: '100%',
		marginTop: 24,
	},
}));

export const StyledTitle = styled(Typography)(() => ({
	'p + &': {
		marginTop: 48,
	},

	'ul + &': {
		marginTop: 24,
	},
}));

export const StyledSubTitle = styled(Typography)(() => ({
	'* + &': {
		marginTop: 24,
	},
}));

export const StyledList = styled('ul')(() => ({
	listStyleType: 'none',
	marginTop: 24,
	marginBottom: 24,
	padding: 0,

	'& li + li': {
		marginTop: 24,
	},

	'& p': {
		paddingLeft: 24,
	},

	'& img + p': {
		marginTop: 24,
	},

	'& p + p': {
		marginTop: 24,
	},
}));

export const StyledCircleList = styled('ul')(({ theme }) => ({
	listStyleType: 'none',

	'& li::marker': {
		color: theme.palette.secondary.main,
	},

	'& li': {
		position: 'relative',
		marginBottom: 8,
	},

	'& li::before': {
		position: 'absolute',
		content: '""',
		left: -37,
		top: 10,
		width: 12,
		height: 12,
		borderWidth: 4,
		borderStyle: 'solid',
		borderColor: theme.palette.secondary.main,
		borderRadius: '50%',
	},
}));

export const StyledDotList = styled('ul')(({ theme }) => ({
	margin: 5,

	'& li::marker': {
		fontSize: 14,
		color: theme.palette.text.secondary,
	},
}));
