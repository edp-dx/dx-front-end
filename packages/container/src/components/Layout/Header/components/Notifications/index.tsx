import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey, useTheme } from '@mui/material/colors';
import { Menu, MenuItem, Typography } from '@mui/material';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchorEl);

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(null);
  }, []);

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
        anchorEl={menuAnchorEl}
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
          <Typography>App-32 deployment to Prod successfully completed ….</Typography>
        </MenuItem>
        <MenuItem style={{ color: theme.palette.warning.main }}>
          <Typography>PR-3727 needs your review …</Typography>
        </MenuItem>
        <MenuItem style={{ color: theme.palette.error.main }}>
          <Typography>Jon Snow needs your approval …</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}