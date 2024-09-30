import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blueGrey } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useStyles } from '../../styles';

export const Notifications = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const { classes: customClasses } = makeStyles()({
    menuItemSuccess: {
      color: theme => theme.palette.success.main,
    },
    menuItemWarning: {
      color: theme => theme.palette.warning.main,
    },
  });

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: blueGrey['600'] }}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={customClasses.menuItemSuccess}>
          "App-32 deployment to Prod successfully completed …"
        </MenuItem>
        <MenuItem className={customClasses.menuItemWarning}>
          "PR-3727 needs your review …"
        </MenuItem>
        <MenuItem className={customClasses.menuItemWarning}>
          "Jon Snow needs your approval …"
        </MenuItem>
      </Menu>
    </div>
  );
};
