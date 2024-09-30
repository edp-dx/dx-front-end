import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // Logic to handle opening of notifications
  }, []);

  const handleClose = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // Logic to handle closing of notifications
  }, []);

  return (
    <Tooltip title="Notifications">
      <IconButton
        sx={{ color: blueGrey['600'] }}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <NotificationsIcon />
      </IconButton>
    </Tooltip>
  );
};