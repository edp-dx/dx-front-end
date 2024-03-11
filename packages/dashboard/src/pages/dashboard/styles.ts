import { IconButton, styled } from '@mui/material';

export const StyledBookmarkButton = styled(IconButton)(({ theme }) => ({
	transition: 'color 300ms ease',

	'&:hover': {
		color: theme.palette.primary.main,
	},
}));
