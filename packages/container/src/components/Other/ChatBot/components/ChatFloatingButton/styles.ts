import { styled } from '@mui/material';

export const StyledChatFloatingButton = styled('div')(({ theme }) => ({
	position: 'sticky',
	zIndex: theme.zIndex.fab,
	pointerEvents: 'none',
	display: 'flex',
	justifyContent: 'flex-end',
	height: 0,
	bottom: 0,
	right: 0,
	marginTop: 'auto',

	'& .MuiFab-root': {
		pointerEvents: 'auto',
		width: theme.typography.pxToRem(50),
		height: theme.typography.pxToRem(50),
		position: 'absolute',
		zIndex: 1,
		bottom: theme.typography.pxToRem(22),
		right: theme.typography.pxToRem(28),
	},
}));
