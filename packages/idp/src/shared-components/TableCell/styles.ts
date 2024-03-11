import { Link, styled } from '@mui/material';

export const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.palette.action.active,
	marginLeft: 8,

	'&:hover': {
		color: theme.palette.primary.main,
	},
}));
