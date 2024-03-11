import { styled } from '@mui/material';

export const StyledContainer = styled('span')(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '24px',
	width: '24px',
	borderRadius: '50%',
	color: 'white',

	'&:hover': {
		cursor: 'pointer',
	},
}));
