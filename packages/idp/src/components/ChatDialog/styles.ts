import { IconButton, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const StyledChatHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	height: theme.typography.pxToRem(44),
	padding: theme.typography.pxToRem(8),
	backgroundColor: theme.palette.common.white,
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledChatContainer = styled('div')(() => ({
	height: '100%',
	overflowY: 'auto',
	overflowX: 'hidden',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: grey['100'],
}));

export const StyledChatBody = styled('div')(() => ({
	display: 'flex',
	overflow: 'hidden',
	flexGrow: 1,
}));

export const StyledChatButton = styled(IconButton)(({ theme }) => ({
	borderRadius: theme.typography.pxToRem(4),
	padding: theme.typography.pxToRem(4),
}));

export const StyledChatMessagesList = styled('div')(({ theme }) => ({
	padding: `${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(
		16,
	)} ${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(16)}`,
	overflowY: 'auto',
	marginBottom: theme.typography.pxToRem(5),
	flexGrow: 1,
}));
