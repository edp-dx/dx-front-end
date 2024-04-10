import React, { useCallback, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import { useStyles } from '../../styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';

export const Notifications = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
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
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem style={{ color: theme.palette.success.main }}>
          App-32 deployment to Prod successfully completed ….
        </MenuItem>
        <MenuItem style={{ color: theme.palette.warning.main }}>
          PR-3727 needs your review …
        </MenuItem>
        <MenuItem style={{ color: theme.palette.error.main }}>
          Jon Snow needs your approval …
        </MenuItem>
      </Menu>
    </div>
  );
};