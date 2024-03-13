import React, { useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // Logic to handle opening of notifications
  }, []);

  const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // Logic to handle closing of notifications
  }, []);

  return (
    <Tooltip title="Notifications">
      <IconButton
        sx={{ color: blueGrey['600'] }}
        aria-label='Notifications'
        component='label'
        className={classes.button}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <NotificationsIcon />
      </IconButton>
    </Tooltip>
  );
};