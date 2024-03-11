import { styled } from '@mui/material';

export const StyledMainImage = styled('div')(({ theme }) => ({
	height: theme.typography.pxToRem(244),
}));
export const StyledMainContent = styled('div')(({ theme }) => ({
	padding: `${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(
		24,
	)} ${theme.typography.pxToRem(16)}`,
}));
