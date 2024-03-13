// Define the styles for the menu items using makeStyles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  menuItemGreen: {
    color: theme.palette.success.main,
  },
  menuItemYellow: {
    color: theme.palette.warning.main,
  },
  // Add other necessary styles here
}));

export default useStyles;