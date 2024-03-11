import { Box, Divider, Typography, styled } from '@mui/material';

export const StyledStepWrapper = styled(Box)(({ theme }) => ({
	paddingTop: theme.typography.pxToRem(16),
	flexDirection: 'column',
	height: '100%',
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
	marginBottom: theme.typography.pxToRem(10),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
	marginTop: theme.typography.pxToRem(8),
	marginBottom: theme.typography.pxToRem(36),
}));

export const StepContentInner = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
}));
