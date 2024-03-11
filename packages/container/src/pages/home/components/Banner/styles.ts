import { styled } from '@mui/material';

const color1 = '#263238';

export const StyledBanner = styled('div')(({ theme }) => ({
	height: theme.typography.pxToRem(324),
	position: 'relative',
	paddingTop: theme.typography.pxToRem(17),
	overflow: 'hidden',
}));

export const StyledBannerOverPicture = styled('div')(() => ({
	height: '100%',
	position: 'relative',
	zIndex: 1,
}));

export const StyledBannerContainerInner = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	maxWidth: theme.typography.pxToRem(636),
	height: '100%',
}));

export const StyledBannerContainerSubline = styled('div')(({ theme }) => ({
	marginTop: 'auto',
	padding: `${theme.typography.pxToRem(8)} 0 ${theme.typography.pxToRem(9)}`,
	backgroundColor: `${color1}52`,
	position: 'relative',

	'&::before': {
		content: '""',
		position: 'absolute',
		bottom: 0,
		right: '100%',
		width: '100vw',
		backgroundColor: `${color1}52`,
		height: '100%',
		zIndex: 1,
	},
}));

export const StyledBannerImage = styled('img')(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: '50%',
	translate: '-50% 0',
	zIndex: 1,
	objectPosition: `${theme.typography.pxToRem(-130)} ${theme.typography.pxToRem(-728)}`,
}));
