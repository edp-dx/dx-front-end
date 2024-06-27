import React, { useCallback, useState } from 'react';
import { IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import { blueGrey } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  button: {
    color: theme.palette.grey['600'],
  },
}));

export const Notifications = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div onMouseLeave={handleClose}>
      <Tooltip title="Notifications">
        <div>
          <IconButton
            sx={{ color: blueGrey['600'] }}
            aria-label="Notifications"
            component="label"
            className={classes.button}
            onMouseEnter={handleOpen}
          >
            <NotificationsIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Menu
        open={Boolean(anchorEl)}
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
          <Typography>App-32 deployment to Prod successfully completed …</Typography>
        </MenuItem>
        <MenuItem style={{ color: theme.palette.warning.main }}>
          <Typography>PR-3727 needs your review …</Typography>
        </MenuItem>
        <MenuItem style={{ color: theme.palette.warning.main }}>
          <Typography>Jon Snow needs your approval …</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}