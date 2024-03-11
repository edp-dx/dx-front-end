import { Box, styled } from '@mui/material';

export const StyledSlotControls = styled('div')(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 2,
	pointerEvents: 'none',
	opacity: 0,
	transition: 'opacity 300ms ease',
}));

export const StyledSlot = styled('div')(() => ({
	position: 'relative',
	width: '100%',

	'&:hover': {
		'.slot-controls': {
			opacity: 1,
		},
	},
}));

export const StyledSlotUpperControls = styled('div')(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	zIndex: 1,
	pointerEvents: 'auto',
}));

export const StyledSlotBottomControls = styled('div')(() => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	zIndex: 1,
	pointerEvents: 'auto',
}));

export const StyledSlotImageWrapper = styled('div')(() => ({
	lineHeight: 0,

	'& img': {
		width: '100%',
	},
}));

export const StyledSlotWidgetExplanation = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 1,
	padding: `${theme.typography.pxToRem(41)} ${theme.typography.pxToRem(
		16,
	)} ${theme.typography.pxToRem(70)} ${theme.typography.pxToRem(16)}`,
	backgroundColor: 'rgba(255, 255, 255, 0.92)',
	overflowY: 'auto',
}));

export const StyledSlotWidgetExplanationFade = styled(Box)(({ theme }) => ({
	position: 'absolute',
	left: 0,
	right: 0,
	bottom: 0,
	pointerEvents: 'none',
	background: 'linear-gradient(0deg, #FFFFFF 36.46%, rgba(255, 255, 255, 0) 91.2%)',
	height: '25%',
	marginRight: theme.typography.pxToRem(15),
	zIndex: 1,
}));
