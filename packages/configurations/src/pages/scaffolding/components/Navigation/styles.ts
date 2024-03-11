import { ListItem, ListItemIcon, styled } from '@mui/material';

export const StyledNavItem = styled(ListItem)(({ theme }) => ({
	padding: 0,
	gap: theme.typography.pxToRem(12),
}));

export const StyledNavItemIcon = styled(ListItemIcon)(() => ({
	minWidth: 'auto',
}));
