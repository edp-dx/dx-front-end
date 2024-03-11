import { Paper, styled } from '@mui/material';

export const StyledTourStep = styled(Paper)(({ theme }) => ({
	padding: `${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(32)}`,
	width: theme.typography.pxToRem(600),
}));
