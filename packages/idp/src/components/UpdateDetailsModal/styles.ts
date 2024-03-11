import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
	width: theme.typography.pxToRem(160),
}));
