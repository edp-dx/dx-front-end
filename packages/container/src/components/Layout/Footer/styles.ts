import { styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';

const footerPadding = 20;

export const StyledFooter = styled('div')(({ theme }) => ({
	padding: `${theme.typography.pxToRem(footerPadding)}`,
	backgroundColor: blueGrey[50],
}));

export const useStyles = makeStyles()((theme) => ({
	link: {
		display: 'block',
		lineHeight: 0,
		textDecoration: 'none',
	},
	divider: {
		marginTop: theme.typography.pxToRem(12),
		marginBottom: theme.typography.pxToRem(20),
	},
	subtract: {
		width: theme.typography.pxToRem(27),
		lineHeight: 0,
		display: 'block',
		position: 'absolute',
		zIndex: 1,
		pointerEvents: 'none',
		top: theme.typography.pxToRem(-footerPadding),
		left: theme.typography.pxToRem(footerPadding),
		translate: `${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(-8)}`,
		color: theme.palette.common.white,
	},
}));
