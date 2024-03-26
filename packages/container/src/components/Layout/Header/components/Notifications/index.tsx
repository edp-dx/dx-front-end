import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme, makeStyles } from 'tss-react/mui';

export const Notifications = () => {
  const theme = useTheme();
  const { classes } = makeStyles()({
    menuItem: {
      color: theme.palette.text.primary,
    },
    menuItemWarning: {
      color: theme.palette.warning.main,
    },
    menuItemError: {
      color: theme.palette.error.main,
    },
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: theme.palette.grey['600'] }}
          aria-label="Notifications"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={classes().menuItem}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose,
        }}
      >
        <MenuItem className={classes().menuItem} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem className={classes().menuItemWarning} onClick={handleClose}>
          Settings
        </MenuItem>
        <MenuItem className={classes().menuItemError} onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};