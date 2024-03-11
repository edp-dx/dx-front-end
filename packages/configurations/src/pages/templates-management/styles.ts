import { styled } from '@mui/material';

export const StyledTableWrapper = styled('div')(({ theme }) => ({
	paddingBottom: theme.typography.pxToRem(40),

	'.MuiTableCell-root': {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
}));
