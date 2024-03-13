import React, { MouseEvent, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    // Logic to handle opening of notifications
  }, []);

  const handleClose = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    // Logic to handle closing of notifications
  }, []);

  return (
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
      <div>
        <p className={classes.menuItemGreen}>
          App-32 deployment to Prod successfully completed ...
        </p>
        <p className={classes.menuItemYellow}>
          PR-3727 needs your review ...
        </p>
        <p className={classes.menuItemYellow}>
          Jon Snow needs your approval ...
        </p>
      </div>
    </Tooltip>
  );
};