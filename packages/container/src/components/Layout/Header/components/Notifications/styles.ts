import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  successMenuItem: {
    color: theme.palette.success.main,
  },
  warningMenuItem: {
    color: theme.palette.warning.main,
  },
  menu: {
    // Add any specific styles for menu here, reusing parameters from the example as much as possible.
  },
  // Add any other styles that are required for the component
}));