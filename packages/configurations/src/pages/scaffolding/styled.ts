import { Container, styled } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	paddingTop: theme.typography.pxToRem(8),
}));

export const StyledScaffolding = styled('div')(({ theme }) => ({
	display: 'flex',
	gap: theme.typography.pxToRem(24),
	paddingBottom: theme.typography.pxToRem(12),
	width: '100%',
}));

export const StyledScaffoldingNav = styled('div')(({ theme }) => ({
	maxWidth: theme.typography.pxToRem(260),
	width: '100%',
	boxShadow: theme.shadows[1],
	padding: theme.typography.pxToRem(8),
	flexShrink: 0,
}));

export const StyledScaffoldingContent = styled('div')(({ theme }) => ({
	flexGrow: 1,
	maxWidth: `calc(100% - ${theme.typography.pxToRem(260)} - ${theme.typography.pxToRem(24)})`,
}));
