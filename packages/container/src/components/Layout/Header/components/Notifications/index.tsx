import React, { MouseEvent, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const Notifications = () => {
  const theme = useTheme();
  const { classes } = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    event.currentTarget.blur();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _PaperProps = {
    className: classes.menuPaper,
  };

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: blueGrey['600'] }}
          aria-label='Notifications'
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
          component='label'
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={_PaperProps}
      >
        <MenuItem component="a" href="#" className={classes.menuItemGreen}>
          <Typography color={theme.palette.text.primary}>New Feature Released!</Typography>
        </MenuItem>
        <MenuItem component="a" href="#" className={classes.menuItemRed}>
          <Typography color={theme.palette.text.secondary}>System Maintenance</Typography>
        </MenuItem>
        <MenuItem component="a" href="#" className={classes.menuItemYellow}>
          <Typography color={theme.palette.text.secondary}>Survey Invitation</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const useStyles = makeStyles()((theme) => ({
  menuPaper: {
    marginTop: theme.spacing(2),
  },
  menuItemGreen: {
    color: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
  },
  menuItemRed: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
  menuItemYellow: {
    color: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
    },
  },
}));