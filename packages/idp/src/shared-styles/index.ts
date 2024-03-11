import { Link, styled } from '@mui/material';

export const StyledTableWrapper = styled('div')(({ theme }) => ({
	paddingBottom: theme.typography.pxToRem(40),

	'.MuiTableCell-root': {
		width: '100%',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',

		'&:not(:last-child)': {
			maxWidth: '13.12857%',
		},

		'&:last-child': {
			maxWidth: '7%',
		},
	},
}));

interface StyledLinkProps {
	disabled?: boolean;
}

export const StyledLinkWithDisabledStatus = styled(Link)<StyledLinkProps>(
	({ theme, disabled }) => ({
		color: theme.palette.action.active,
		marginLeft: 8,
		pointerEvents: disabled ? 'none' : 'auto',

		'&:hover': {
			color: disabled ? theme.palette.action.active : theme.palette.primary.main,
			cursor: disabled ? 'default' : 'pointer',
		},
	}),
);
