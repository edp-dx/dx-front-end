import { Container, styled } from '@mui/material';

export const StyledAppRoot = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	paddingTop: theme.typography.pxToRem(8),
}));

export const StyledNav = styled('div')(({ theme }) => ({
	maxWidth: theme.typography.pxToRem(260),
	width: '100%',
	boxShadow: theme.shadows[1],
	padding: theme.typography.pxToRem(8),
	flexShrink: 0,
}));

export const StyledDivider = styled('div')(({ theme }) => ({
	height: theme.typography.pxToRem(24),
}));

export const StyledContentInner = styled('div')(() => ({
	flexGrow: 1,
}));
