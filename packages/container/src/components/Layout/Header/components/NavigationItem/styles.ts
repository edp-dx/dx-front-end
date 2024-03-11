import { ListItemText, MenuItem, styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	navLink: {
		display: 'block',
		textDecoration: 'none',
		textTransform: 'capitalize',
		padding: `${theme.typography.pxToRem(18)} ${theme.typography.pxToRem(16)}`,
		color: blueGrey['600'],
		backgroundColor: 'transparent',
		position: 'relative',
		borderRadius: 0,
		transition: 'background-color 300ms ease',

		'&:hover': {
			backgroundColor: theme.palette.action.hover,
		},

		'&::before': {
			content: '""',
			position: 'absolute',
			top: '100%',
			left: 0,
			right: 0,
			height: '1px',
			backgroundColor: 'transparent',
		},
	},
	navLinkHovered: {
		backgroundColor: theme.palette.action.hover,
	},
	navLinkActive: {
		color: theme.palette.primary.main,
		backgroundColor: 'rgba(33, 150, 243, 0.04)',

		'&:hover': {
			backgroundColor: 'rgba(33, 150, 243, 0.04)',
		},

		'&::before': {
			backgroundColor: 'rgba(0, 0, 0, 0.24)',
		},
	},
	popover: {
		maxWidth: theme.typography.pxToRem(220),
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		overflowX: 'unset',
		overflowY: 'unset',

		'&::before': {
			content: '""',
			position: 'absolute',
			marginRight: '-0.71em',
			bottom: '100%',
			left: '50%',
			width: 10,
			height: 10,
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[1],
			transform: 'translate(-50%, 50%) rotate(-45deg)',
			clipPath:
				'polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))',
		},
	},
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	maxWidth: theme.typography.pxToRem(250),
})) as unknown as typeof MenuItem;

export const StyledListItemText = styled(ListItemText)(() => ({
	whiteSpace: 'normal',
}));
