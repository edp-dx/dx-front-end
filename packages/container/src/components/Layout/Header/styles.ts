import { styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';

export const StyledHeader = styled('div')(({ theme }) => ({
	position: 'sticky',
	top: 0,
	left: 0,
	right: 0,
	zIndex: theme.zIndex.appBar,
	backgroundColor: blueGrey['50'],
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledLogoWrapper = styled('div')(() => ({
	display: 'flex',
	alignItems: 'center',
	marginRight: 'auto',
}));

export const useStyles = makeStyles()((theme) => ({
	logoLink: {
		lineHeight: 0,
	},
	popover: {
		maxWidth: theme.typography.pxToRem(220),
		overflow: 'visible',
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',

		'&::before': {
			content: '""',
			position: 'absolute',
			marginRight: '-0.71em',
			bottom: '100%',
			left: '50%',
			width: 10,
			height: 10,
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[1],
			transform: 'translate(-50%, 50%) rotate(-45deg)',
			clipPath:
				'polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))',
		},
	},
}));
