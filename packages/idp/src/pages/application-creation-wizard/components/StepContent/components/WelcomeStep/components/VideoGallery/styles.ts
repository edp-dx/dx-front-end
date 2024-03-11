import { ListItem, ListItemIcon, Tabs, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const StyledNavItem = styled(ListItem)(({ theme }) => ({
	padding: `${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(16)}`,
	gap: theme.typography.pxToRem(12),
}));

export const StyledNavItemIcon = styled(ListItemIcon)(() => ({
	minWidth: 'auto',
}));

export const StyledVideoGalleryWrapper = styled('div')(({ theme }) => ({
	border: '1px solid rgba(70, 73, 77, 0.24)',
	borderRadius: theme.shape.borderRadius,
	overflow: 'hidden',
}));

export const StyledVideoGalleryGridItem = styled(Grid)(({ theme }) => ({
	maxHeight: theme.typography.pxToRem(270),
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
}));

export const StyledVideoGalleryNavTabs = styled(Tabs)(() => ({
	overflow: 'initial',
	overflowY: 'auto',

	'& .MuiTabs-scroller': {
		overflow: 'initial',
	},
}));

export const StyledVideo = styled('video')(() => ({
	width: '100%',
	height: '100%',
}));
