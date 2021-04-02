import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
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
 })
)

export default useStyles;
