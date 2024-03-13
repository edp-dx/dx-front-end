import React, { MouseEvent, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { blueGrey } from '@mui/material/colors';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
          aria-expanded={open ? 'true' : undefined}
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
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notification-button',
        }}
      >
        <MenuItem onClick={handleClose} className={classes.menuItemGreen}>
          App-32 deployment to Prod successfully completed ...
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItemYellow}>
          PR-3727 needs your review ...
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItemYellow}>
          Jon Snow needs your approval ...
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};