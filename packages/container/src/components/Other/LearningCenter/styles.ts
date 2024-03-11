import { styled } from '@mui/material';

export const StyledMain = styled('div')(() => ({
	display: 'flex',
	height: '100%',
}));

export const StyledNav = styled('div')(({ theme }) => ({
	width: theme.typography.pxToRem(260),
	flexShrink: 0,
	padding: `${theme.typography.pxToRem(18)} ${theme.typography.pxToRem(
		8,
	)} ${theme.typography.pxToRem(24)}`,
	display: 'flex',
	flexDirection: 'column',
	gap: theme.typography.pxToRem(24),
	boxShadow:
		'0px 2px 1px -1px rgba(61, 71, 82, 0.2), 0px 1px 1px rgba(61, 71, 82, 0.14), 0px 1px 3px rgba(61, 71, 82, 0.12)',

	'& .MuiTabs-root': {
		flexGrow: 1,
	},

	'& .MuiTabs-flexContainerVertical': {
		height: '100%',
	},

	'& .MuiTab-root': {
		letterSpacing: '1px',
		fontWeight: 400,
		textTransform: 'initial',

		'&:not(:last-child)': {
			marginBottom: theme.typography.pxToRem(8),
		},
		'&:last-child': {
			marginTop: 'auto',
		},
	},
}));

export const StyledContent = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
}));

export const StyledContentInner = styled('div')(({ theme }) => ({
	padding: `${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(24)}`,
	flexGrow: 1,
	overflowY: 'auto',
}));

export const StyledContentHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	padding: `${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(24)}`,
	minHeight: theme.typography.pxToRem(64),
}));

export const StyledContentHeaderBackground = styled('div')(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 1,
}));

export const StyledContentHeaderContent = styled('div')(() => ({
	position: 'relative',
	zIndex: 1,
	width: '100%',
}));

export const StyledDivider = styled('div')(({ theme }) => ({
	height: theme.typography.pxToRem(24),
}));
