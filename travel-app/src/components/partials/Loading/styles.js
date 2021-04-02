import { makeStyles } from '@material-ui/core';
import { loadingBackground } from '../../../theme';

const styles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: loadingBackground,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 999,
  },
  loader: {
    zIndex: 1000,
  },
  fixed: {
    position: 'fixed',
  }
});

export default styles;
