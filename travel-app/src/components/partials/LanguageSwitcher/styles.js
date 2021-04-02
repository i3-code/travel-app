import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.spacing(18),
  },
  flag: {
    width: theme.spacing(4),
    height: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
