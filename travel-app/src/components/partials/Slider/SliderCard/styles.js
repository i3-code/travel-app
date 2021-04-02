import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    small: {
      height: 150,
    },
    large: {
      height: 500,
      margin: 0,
      '&:fullscreen': {
        height: 700,
      }
    },
    card: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: '5px 10px',
      color: '#fff',
      textOverflow: 'ellipsis',
    },
    text: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 10,
        lineHeight: 1.1,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: 14,
        lineHeight: 1.2,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: 16,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 18,
        lineHeight: 1.3,
      },
    },
    name: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        lineHeight: 1.1,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: 18,
        lineHeight: 1.2,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: 22,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 28,
      },
    },
    rating: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 20,
      top: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 10,
      [theme.breakpoints.down('sm')]: {
        padding: 0
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
      }
    },
  })
)

export default useStyles;
