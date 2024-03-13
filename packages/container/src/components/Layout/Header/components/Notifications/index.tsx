import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { blueGrey, red, green, amber } from '@mui/material/colors';

export const Notifications = () => {
  // State for menu open and anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Mock notification items
  const notificationItems = [
    { text: 'New user registered', color: green[600] },
    { text: 'Server error reported', color: red[600] },
    { text: 'New sale completed', color: amber[600] }
  ];

  // Handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: blueGrey['600'] }}
          aria-label='Notifications'
          component='label'
          onClick={handleMenuOpen}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {notificationItems.map((item, index) => (
          <MenuItem key={index} onClick={(event) => event.preventDefault()} style={{ color: item.color }}>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};