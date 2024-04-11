import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useStyles } from '../../styles';
import { useTheme } from '@mui/material/styles';

export const Notifications = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: blueGrey['600'] }}
          aria-label="Notifications"
          component="label"
          className={classes.button}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notifications-button',
        }}
      >
        <MenuItem style={{ color: theme.palette.primary.main }}>Notification 1</MenuItem>
        <MenuItem style={{ color: theme.palette.secondary.main }}>Notification 2</MenuItem>
        <MenuItem style={{ color: theme.palette.error.main }}>Notification 3</MenuItem>
      </Menu>
    </div>
  );
};