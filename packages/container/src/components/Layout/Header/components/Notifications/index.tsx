import React, { useState, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const isOpen = Boolean(anchorEl);

  // Sample notifications for demonstration; replace with your data source
  const notifications = [
    'Notification 1',
    'Notification 2',
    'Notification 3',
  ];

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: theme.palette.secondary.main }}
          aria-label="Notifications"
          component="label"
          className={classes.button}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {notifications.map((notification, index) => (
          <MenuItem
            key={index}
            onClick={handleClose}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {notification}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};