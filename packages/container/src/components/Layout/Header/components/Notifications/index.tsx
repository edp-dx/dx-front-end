import React, { useCallback, MouseEvent, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Menu, MenuItem, ListItemIcon, ListItemText, PaperProps } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { blueGrey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchorEl);

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);

  const _PaperProps: Partial<PaperProps<'div'>> = {
    elevation: 0,
    className: classes.popover,
  };

  return (
    <div onMouseLeave={handleClose}>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: blueGrey['600'] }}
          aria-label="Notifications"
          component="label"
          onMouseEnter={handleOpen}
          className={classes.button}
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
        PaperProps={_PaperProps}
      >
        <MenuItem>
          <ListItemIcon>
            <DoneIcon style={{ color: theme.palette.success.main }} />
          </ListItemIcon>
          <ListItemText primary="App-32 deployment to Prod successfully completed." />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PriorityHighIcon style={{ color: theme.palette.warning.main }} />
          </ListItemIcon>
          <ListItemText primary="PR-3727 needs your review." />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HelpOutlineIcon style={{ color: theme.palette.warning.main }} />
          </ListItemIcon>
          <ListItemText primary="Jon Snow needs your approval." />
        </MenuItem>
      </Menu>
    </div>
  );
};