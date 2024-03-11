import { styled } from '@mui/material';

export const StyledComparisonWrapper = styled('div')(() => ({
	position: 'relative',
	width: '100%',
}));

export const StyledComparisonControls = styled('div')(() => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 1,
}));
