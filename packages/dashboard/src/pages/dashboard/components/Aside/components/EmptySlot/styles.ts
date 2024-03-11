import { Button, styled } from '@mui/material';

import { SLOT_WRAPPER_HEIGHT } from '../../../../constants';

export const StyledEmptySlot = styled('div')(({ theme }) => ({
	height: `calc(${SLOT_WRAPPER_HEIGHT}px / 5)`,
	padding: theme.typography.pxToRem(8),
	boxSizing: 'border-box',
	backgroundImage:
		// eslint-disable-next-line quotes
		"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='none' stroke='%237B61FF' stroke-width='1' stroke-dasharray='17 18' stroke-dashoffset='11' stroke-linecap='square'/%3E%3C/svg%3E\")",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
	border: '1px dashed #2196F3',
	width: '100%',
	height: '100%',

	'&:hover': {
		backgroundColor: theme.palette.primary.selected,
	},
}));
