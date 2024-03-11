import { Tabs, styled } from '@mui/material';

export const StyledTabs = styled(Tabs)(({ theme }) => ({
	minHeight: 42,
	'.MuiTab-root.Mui-selected': {
		color: theme.palette.primary.main,
		backgroundColor: theme.palette.background.default,
	},
	'.MuiTab-root': {
		minWidth: 'auto',
		padding: '9px 16px',
		fontSize: 14,
		fontWeight: 500,
		lineHeight: '24px',
	},
}));
