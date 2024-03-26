import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import { Menu, MenuItem, ListItemText, useTheme } from '@mui/material';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);

  return (
    <div onMouseLeave={handleClose}>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: blueGrey['600'] }}
          aria-label="Notifications"
          component="label"
          className={classes.button}
          onMouseEnter={handleOpen}
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
        keepMounted
      >
        <MenuItem>
          <ListItemText primary="App-32 deployment to Prod successfully completed" style={{ color: theme.palette.success.main }} />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="PR-3727 needs your review" style={{ color: theme.palette.warning.main }} />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Jon Snow needs your approval" style={{ color: theme.palette.warning.main }} />
        </MenuItem>
      </Menu>
    </div>
  );
};