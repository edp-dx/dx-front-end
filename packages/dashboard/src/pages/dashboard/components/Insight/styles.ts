import { Box, styled } from '@mui/material';

export const StyledInsightArrow = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	overflow: 'hidden',
	width: '24px',
	height: '18px',
	marginBottom: '-18px',
	marginLeft: theme.typography.pxToRem(24),
	boxSizing: 'border-box',
	color: theme.palette.primary.focus,
	transform: 'scaleX(-0.8)',

	'&::before': {
		display: 'block',
		transformOrigin: '100% 0',
		content: '""',
		margin: 'auto',
		width: '100%',
		height: '100%',
		backgroundColor: 'currentColor',
		transform: 'rotate(45deg)',
	},
}));
