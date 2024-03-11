import { Button, styled } from '@mui/material';

export const StyledAIButton = styled(Button)(({ theme }) => ({
	minWidth: 34,
	height: 34,
	padding: 4,
	border: '1px solid',
	borderColor: theme.palette.divider,
	borderRadius: 2,

	'&:hover': {
		boxShadow: theme.shadows[6],
	},

	'& .MuiButton-startIcon': {
		marginRight: 0,
		marginLeft: 0,
	},
}));
