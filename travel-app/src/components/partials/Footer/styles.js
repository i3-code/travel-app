import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 450,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  text: {
    fontSize: 14,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 12,
    },
  },
  appBar:{
    width: '100%',
  },
  toolbar:{
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoImage: {
    height: theme.spacing(3),
    width: 'auto',
  },
  year: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: 12,
    },
  }
}));

export default useStyles;
