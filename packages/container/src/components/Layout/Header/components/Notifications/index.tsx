import React, { MouseEvent, useState, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
          component="label"
          className={classes.button}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
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