import { Box, Button, styled } from '@mui/material';

export const StyledMessageWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	marginBottom: theme.typography.pxToRem(16),
}));

export const StyledMessage = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	padding: `${0} ${theme.typography.pxToRem(4)}`,
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.common.white,
	color: theme.palette.text.primary,
	maxWidth: '85%',
	boxShadow:
		'0px 5px 6px -3px rgba(61, 71, 82, 0.2), 0px 9px 12px 1px rgba(61, 71, 82, 0.14), 0px 3px 16px 2px rgba(61, 71, 82, 0.12)',
}));

export const StyledMessageContent = styled('div')(({ theme }) => ({
	padding: theme.typography.pxToRem(8),

	'& a': {
		textDecoration: 'none',

		'&::hover': {
			borderBottom: '1px solid',
		},
	},
	'& abbr': {
		borderBottom: '1px dotted',
		cursor: 'help',
	},
	'& cite': {
		fontStyle: 'italic',
	},
	'& hr': {
		background: '#e6e6e6',
		border: 'none',
		display: 'block',
		height: '1px',
		marginBottom: '1.4em',
		marginTop: '1.4em',
	},

	'& img': { verticalAlign: 'text-bottom' },
	'& ins': { backgroundColor: 'lime', textDecoration: 'none' },
	'& mark': { backgroundColor: '#ff0' },
	'& small': { fontSize: '0.8em' },
	'& strong': { fontWeight: 700 },
	'& sub, & sup': { fontSize: '0.8em' },
	'& sub': { verticalAlign: 'sub' },
	'& sup': { verticalAlign: 'super' },
	'& p, & dl, & ol, & ul, & blockquote, & pre, & table': {
		marginBottom: '1.4em',
	},
	'& p:last-child, & dl:last-child, & ol:last-child, & ul:last-child, & blockquote:last-child, & pre:last-child, & table:last-child':
		{
			marginBottom: '0',
		},
	'& p:empty': { display: 'none' },
	'& h1, & h2, & h3, & h4, & h5, & h6': {
		fontWeight: 700,
		lineHeight: 1.2,
	},
	'& h1:first-child, & h2:first-child, & h3:first-child, & h4:first-child, & h5:first-child, & h6:first-child':
		{
			marginTop: '0',
		},
	'& h1': {
		fontSize: '2.4em',
		marginBottom: '.58333em',
		marginTop: '.58333em',
		lineHeight: 1,
	},
	'& h2': {
		fontSize: '1.6em',
		marginBottom: '.875em',
		marginTop: '1.75em',
		lineHeight: 1.1,
	},
	'& h3': {
		fontSize: '1.3em',
		marginBottom: '1.07692em',
		marginTop: '1.07692em',
	},
	'& h4': {
		fontSize: '1.2em',
		marginBottom: '1.16667em',
		marginTop: '1.16667em',
	},
	'& h5': {
		fontSize: '1.1em',
		marginBottom: '1.27273em',
		marginTop: '1.27273em',
	},
	'& h6': {
		fontSize: '1em',
		marginBottom: '1.4em',
		marginTop: '1.4em',
	},
	'& dd': { marginLeft: '1.4em' },
	'& ol, & ul': {
		paddingLeft: theme.typography.pxToRem(20),
		listStylePosition: 'outside',
	},
	'& ol': { listStyleType: 'decimal' },
	'& ol ol': { listStyleType: 'lower-alpha' },
	'& ol ol ol': { listStyleType: 'lower-roman' },
	'& ol ol ol ol': { listStyleType: 'lower-greek' },
	'& ol ol ol ol ol': { listStyleType: 'decimal' },
	'& ol ol ol ol ol ol': { listStyleType: 'lower-alpha' },
	'& ul': { listStyleType: 'disc' },
	'& ul ul': { listStyleType: 'circle' },
	'& ul ul ul': { listStyleType: 'square' },
	'& ul ul ul ul': { listStyleType: 'circle' },
	'& ul ul ul ul ul': { listStyleType: 'disc' },
	'& ul ul ul ul ul ul': { listStyleType: 'circle' },
	'& blockquote': {
		borderLeft: '4px solid #e6e6e6',
		padding: '0.6em 1.2em',
	},
	'& blockquote p': { marginBottom: '0' },
	'& code, & kbd, & samp': {
		MozOsxFontSmoothing: 'auto',
		WebkitFontSmoothing: 'auto',
		backgroundColor: '#f2f2f2',
		color: '#333',
		fontSize: '0.9em',
		borderRadius: '3px',
		lineHeight: 1.77778,
		padding: '0.1em 0.4em 0.2em',
		verticalAlign: 'baseline',
	},
	'& figure': { marginBottom: '2.8em', textAlign: 'center' },
	'& figure:first-child': { marginTop: '0' },
	'& figure:last-child': { marginBottom: '0' },
	'& figcaption': { fontSize: '0.8em', marginTop: '.875em' },
	'& table': { width: '100%' },
	'& table pre': { whiteSpace: 'pre-wrap' },
	'& th, & td': {
		fontSize: '1em',
		padding: '.7em',
		border: '1px solid #e6e6e6',
		lineHeight: 1.4,
	},
	'& thead tr, & tfoot tr': {
		backgroundColor: '#f5f5f5',
	},
	'& thead th, & thead td, & tfoot th, & tfoot td': {
		fontSize: '.9em',
		padding: '.77778em',
	},
	'& thead th code, & thead td code, & tfoot th code, & tfoot td code': {
		backgroundColor: '#fff',
	},
	'& tbody tr': { backgroundColor: '#fff' },
}));

export const StyledCode = styled('div')(({ theme }) => ({
	marginTop: 5,
	marginBottom: 5,
	position: 'relative',
	border: '1px solid transparent',
	borderRadius: '3px',
	transition: 'border-color 0.1s',
	whiteSpace: 'break-spaces',

	'&:hover': {
		borderColor: theme.palette.primary.main,

		'& button': {
			opacity: 1,
		},
	},

	'& code': {
		wordWrap: 'break-word',
		paddingLeft: theme.typography.pxToRem(10),
		paddingBottom: theme.typography.pxToRem(10),
		paddingTop: theme.typography.pxToRem(28),
		paddingRight: theme.typography.pxToRem(28),
		display: 'block',
		backgroundColor: '#f2f2f2',
		color: '#333',
		fontSize: '0.9em',
		borderRadius: '3px',
		lineHeight: 1.77778,
	},
}));

export const StyledButton = styled(Button)(({ theme }) => ({
	color: theme.palette.action.active,
	borderColor: 'currentcolor',
	whiteSpace: 'nowrap',
	textTransform: 'initial',

	'&:hover': {
		color: theme.palette.primary.main,
	},
}));

export const StyledActionButton = styled(Button)(({ theme }) => ({
	color: theme.palette.action.active,
	borderColor: 'currentcolor',
	whiteSpace: 'nowrap',
	fontWeight: 500,

	'&:hover': {
		color: theme.palette.primary.main,
	},
}));

export const StyledCopyButton = styled(Button)(({ theme }) => ({
	position: 'absolute',
	transition: 'opacity 0.1s',
	opacity: 0,
	right: 0,
	top: 3,
	color: theme.palette.action.active,
	whiteSpace: 'nowrap',
	fontWeight: 500,

	'& span': {
		marginRight: '5px !important',
	},

	'&:hover': {
		color: theme.palette.primary.main,
	},
}));

export const StyledIconButton = styled('div')(({ theme }) => ({
	cursor: 'pointer',
	color: theme.palette.action.active,

	'&:hover': {
		color: theme.palette.primary.main,
	},
}));
