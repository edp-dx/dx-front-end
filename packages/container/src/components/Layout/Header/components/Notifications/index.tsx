import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { blueGrey, green, yellow } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  menuItemSuccess: {
    color: theme.palette.success.main,
  },
  menuItemWarning: {
    color: theme.palette.warning.main,
  },
  button: {
    // Your existing custom button styles here. This is just an example.
  },
}));

export const Notifications = () => {
  const { classes } = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

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
        id="notifications-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notifications-button',
        }}
      >
        <MenuItem className={classes.menuItemSuccess}>
          App-32 deployment to Prod successfully completed…
        </MenuItem>
        <MenuItem className={classes.menuItemWarning}>
          PR-3727 needs your review…
        </MenuItem>
        <MenuItem className={classes.menuItemWarning}>
          Jon Snow needs your approval…
        </MenuItem>
      </Menu>
    </div>
  );
};