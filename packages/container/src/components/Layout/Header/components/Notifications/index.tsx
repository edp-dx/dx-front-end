import React, { MouseEvent, useState, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import { useStyles } from '../../styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  
  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: blueGrey['600'] }}
          aria-label="Notifications"
          aria-controls="notification-menu"
          aria-haspopup="true"
          component="label"
          className={classes.button}
          onClick={handleOpen}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuItemGreen}>
          App-32 deployment to Prod successfully completed ...
        </MenuItem>
        <MenuItem className={classes.menuItemYellow}>
          PR-3727 needs your review ...
        </MenuItem>
        <MenuItem className={classes.menuItemYellow}>
          Jon Snow needs your approval ...
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};