import { styled } from '@mui/material';

export const StyledTableWrapper = styled('div')(({ theme }) => ({
	paddingBottom: theme.typography.pxToRem(40),

	'.MuiTableCell-root': {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',

		'&:nth-of-type(odd)': {
			width: '17%',
		},

		'&:first-of-type': {
			width: '28%',
		},

		'&:last-child': {
			width: 84,
		},
	},
}));
