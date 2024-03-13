import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  menuItemText: {
    color: theme.palette.text.primary,
  },
}));

export const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      onMouseOver={handleOpen}
      onMouseLeave={handleClose}
    >
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: blueGrey['600'] }}
          aria-label='Notifications'
          component='label'
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notification-button',
        }}
      >
        <MenuItem className={classes.menuItem}>
          <span className={classes.menuItemText}>Notification 1</span>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <span className={classes.menuItemText}>Notification 2</span>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <span className={classes.menuItemText}>Notification 3</span>
        </MenuItem>
      </Menu>
    </div>
  );
};