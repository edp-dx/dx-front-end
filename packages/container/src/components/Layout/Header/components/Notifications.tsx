import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications = (props) => {
  return (
    <Tooltip title="Notifications">
      <IconButton {...props}>
        <NotificationsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Notifications;