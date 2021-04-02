import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20,
    top: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  stars: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      size: 'small',
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  red: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: '10px',
    fontWeight: 'bold',
    padding: theme.spacing(1),
    color: theme.palette.error.main,
  },
  yellow: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: '10px',
    fontWeight: 'bold',
    padding: theme.spacing(1),
    color: theme.palette.warning.main,
  },
  green: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: '10px',
    padding: theme.spacing(1),
    color: theme.palette.success.main,
  },
}));

export default useStyles;
