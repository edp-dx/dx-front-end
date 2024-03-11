import { ButtonBase, Menu, PaperProps, Typography } from '@mui/material';
import clsx from 'clsx';
import * as React from 'react';
import { FC, MouseEvent, useCallback, useMemo, useState } from 'react';
import { matchPath } from 'react-router';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { NavLinkProps } from '~/components/Layout/Header/components/NavigationItem/types';

import { StyledListItemText, StyledMenuItem, useStyles } from './styles';

const NavLinkWithChildren: FC<NavLinkProps> = ({ to, name, exact = false, subMenuList }) => {
	const { classes } = useStyles();

	const {
		location: { pathname },
	} = useHistory();

	const isActivePath = useMemo(
		() =>
			matchPath(pathname, {
				path: to,
				exact: exact,
				strict: false,
			}),
		[pathname, to, exact],
	);

	const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

	const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
		setAnchorEl(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const open = !!anchorEl;

	const _PaperProps: Partial<PaperProps<'div'>> = {
		elevation: 0,
		className: classes.popover,
	};

	return (
		<div onMouseLeave={handleClose}>
			<ButtonBase
				className={clsx(classes.navLink, {
					// [classes.navLinkHovered]: boundMenuProps.open,
					[classes.navLinkActive]: !!isActivePath,
				})}
				onMouseOver={handleOpen}
				style={{ zIndex: 1301 }}
			>
				<Typography>{name}</Typography>
			</ButtonBase>
			<Menu
				open={open}
				anchorEl={anchorEl}
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
				{subMenuList.map(({ to, name }) => {
					const key = `nav-sublink::${name}`;

					return (
						<StyledMenuItem component={Link} to={to} key={key}>
							<StyledListItemText>{name}</StyledListItemText>
						</StyledMenuItem>
					);
				})}
			</Menu>
		</div>
	);
};

export const NavigationItem: FC<NavLinkProps> = ({ to, name, exact = false, subMenuList }) => {
	const { classes } = useStyles();
	const hasChildren = useMemo(() => !!subMenuList && subMenuList.length, [subMenuList]);

	return hasChildren ? (
		<NavLinkWithChildren to={to} name={name} exact={exact} subMenuList={subMenuList} />
	) : (
		<ButtonBase>
			<NavLink
				to={to}
				className={classes.navLink}
				activeClassName={classes.navLinkActive}
				exact={exact}
			>
				<Typography>{name}</Typography>
			</NavLink>
		</ButtonBase>
	);
};
