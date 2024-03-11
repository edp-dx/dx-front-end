import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
	Divider,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	PaperProps,
	Typography,
	useTheme,
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { MouseEvent, ReactElement, useCallback } from 'react';
import * as React from 'react';
import { shallow } from 'zustand/shallow';
import { headerMenuList } from '~/components/Layout/Header/constants';
import { useHeaderStore } from '~/store/Header';

import { useStyles } from '../../styles';

export const ProfileMenu = (): ReactElement => {
	const { classes } = useStyles();
	const theme = useTheme();

	const { menuAnchors, setMenuAnchors } = useHeaderStore(
		(state) => ({
			menuAnchors: state.menuAnchors,
			setMenuAnchors: state.setMenuAnchors,
		}),
		shallow,
	);

	const _PaperProps: Partial<PaperProps<'div'>> = {
		elevation: 0,
		className: classes.popover,
	};

	const handleOpen = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
			setMenuAnchors({
				[headerMenuList.PROFILE_MENU]: event.currentTarget,
			});
		},
		[setMenuAnchors],
	);

	const handleClose = useCallback(() => {
		setMenuAnchors({
			[headerMenuList.PROFILE_MENU]: null,
		});
	}, [setMenuAnchors]);

	const open = !!menuAnchors[headerMenuList.PROFILE_MENU];

	return (
		<div onMouseLeave={handleClose}>
			<IconButton
				sx={{
					color: blueGrey['600'],
					'&[aria-controls="profile-menu"]': {
						color: theme.palette.primary.main,
					},
				}}
				aria-label='Profile'
				onMouseOver={handleOpen}
				style={{ zIndex: 1301 }}
			>
				<AccountCircleIcon />
			</IconButton>
			<Menu
				open={open}
				anchorEl={menuAnchors[headerMenuList.PROFILE_MENU]}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				PaperProps={_PaperProps}
				disableAutoFocusItem
				disableScrollLock
				MenuListProps={{
					onMouseLeave: handleClose,
				}}
				sx={{
					pointerEvents: 'none',

					'& .MuiPaper-root': {
						pointerEvents: 'auto',
					},
				}}
			>
				<ListItem style={{ flexWrap: 'wrap' }}>
					<div style={{ width: '100%' }}>
						<Typography sx={{ color: theme.palette.text.primary }}>
							John Developer
						</Typography>
					</div>
					<div style={{ width: '100%' }}>
						<Typography variant={'body2'} sx={{ color: theme.palette.text.secondary }}>
							developer@company.com
						</Typography>
					</div>
				</ListItem>
				<Divider />
				<MenuList>
					<MenuItem>
						<ListItemIcon color={theme.palette.action.active}>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText>Settings</ListItemText>
					</MenuItem>
					<MenuItem>
						<ListItemIcon color={theme.palette.action.active}>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText>Profile</ListItemText>
					</MenuItem>
				</MenuList>
				<Divider />
				<MenuItem>
					<ListItemIcon color={theme.palette.action.active}>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText>Sign out</ListItemText>
				</MenuItem>
			</Menu>
		</div>
	);
};
