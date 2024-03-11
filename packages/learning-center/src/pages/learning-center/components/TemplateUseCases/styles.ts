import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledTemplateUseCases = styled('div')(() => ({
	paddingBottom: 44,
}));

export const StyledPagination = styled('div')(() => ({
	paddingTop: 8,
	display: 'flex',
	justifyContent: 'flex-end',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.palette.action.active,
	textTransform: 'uppercase',
	textDecoration: 'none',
	fontWeight: 500,
	fontSize: theme.typography.pxToRem(14),
	padding: `${theme.typography.pxToRem(9)} ${theme.typography.pxToRem(8)}`,

	'&:hover': {
		color: theme.palette.primary.main,
	},
}));

export const StyledContent = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'row',
	gap: 72,
	paddingTop: 24,
	paddingBottom: 24,

	'& img': {
		maxWidth: 370,
		width: '100%',
	},

	'& p + p': {
		marginTop: 30,
	},
}));
