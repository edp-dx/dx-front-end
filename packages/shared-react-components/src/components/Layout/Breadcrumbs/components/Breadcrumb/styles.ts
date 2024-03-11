import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	icon: {
		'& svg': {
			display: 'block',
		},
	},
	navLink: {
		display: 'flex',
		color: theme.palette.action.active,
		textDecoration: 'none',
		transition: 'color 200ms ease',

		'&:hover': {
			color: theme.palette.primary.main,
		},
	},

	navLinkActive: {
		color: theme.palette.text.primary,
	},
}));
