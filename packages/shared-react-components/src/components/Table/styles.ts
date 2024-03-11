import { styled } from '@mui/material';

export const StyledTableWrapper = styled('div')(() => ({
	table: {
		tableLayout: 'fixed',
	},
	p: {
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
}));
