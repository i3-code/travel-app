import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    position: 'relative',
  },
  line: {
    display: 'flex',
    alignItems: 'center',
  },
  err: {
    fontSize: 170,
  },
  icon: {
    fontSize: 115,
  },
}));

export default useStyles;

