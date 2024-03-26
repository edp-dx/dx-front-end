import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          sx={{ color: blueGrey['600'] }}
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
          <MenuItem key={index} onClick={handleClose}>
            {notification}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};