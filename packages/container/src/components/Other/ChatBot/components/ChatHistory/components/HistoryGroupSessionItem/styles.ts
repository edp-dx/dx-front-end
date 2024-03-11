import { ListItemButton, styled } from '@mui/material';

export const StyledHistoryGroupSessionItem = styled(ListItemButton)(({ theme }) => ({
	borderTop: `1px solid ${theme.palette.divider}`,
	overflow: 'hidden',
	display: 'block',
	backgroundColor: theme.palette.action.hover,
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
}));
