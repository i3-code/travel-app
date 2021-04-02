import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  mapBox: {
    width: '100%',
    height: 0,
    paddingTop: '56.25%',
  },
  fsWrapper: {
    position: 'relative',
    width: '100%',
    height: '0',
  },
  fsButton: {
    color: theme.palette.getContrastText(blue[500]),
    position: 'absolute',
    top: theme.spacing(0.5),
    left: `calc(100% - ${theme.spacing(6.5)}px)`,
    zIndex: 2,
  },
  marker: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    cursor: 'pointer',
  },
  popover: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(1),
    pointerEvents: 'none',
  },
}));

export default useStyles;
