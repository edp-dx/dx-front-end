import { styled } from '@mui/material';

export const StyledMain = styled('div')(({ theme }) => ({
	padding: `${theme.typography.pxToRem(31)} 0 ${theme.typography.pxToRem(60)}`,
}));

export const StyledCarouselSection = styled('div')(({ theme }) => ({
	position: 'relative',
	padding: `${theme.typography.pxToRem(16)} 0 ${theme.typography.pxToRem(
		16,
	)} ${theme.typography.pxToRem(24)}`,
}));

export const StyledGradient = styled('div')(({ theme }) => ({
	height: theme.typography.pxToRem(49),
	borderRadius: theme.typography.pxToRem(4),
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	zIndex: -1,
	overflow: 'hidden',

	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: 'linear-gradient(180deg, #ECEFF1 0%, rgba(236, 239, 241, 0) 100%)',
		rotate: '-2deg',
		translate: '0 -50%',
	},
}));
