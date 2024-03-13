import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';

const Notifications = () => {
  return (
    <Tooltip title="Notifications">
      <IconButton
        sx={{ color: blueGrey['600'] }}
        aria-label='Notifications'
        component='label'
      >
        <NotificationsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Notifications;