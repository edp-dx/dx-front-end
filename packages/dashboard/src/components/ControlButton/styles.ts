import { ButtonBase, styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

export const StyledControlButton = styled(ButtonBase)(({ theme, disabled }) => ({
	width: theme.typography.pxToRem(24),
	height: theme.typography.pxToRem(24),
	color: theme.palette.common.white,
	backgroundColor: disabled ? blueGrey['50'] : blueGrey['100'],
	transition: 'background-color 300ms ease',

	'&:hover': {
		backgroundColor: blueGrey['300'],
	},
}));
