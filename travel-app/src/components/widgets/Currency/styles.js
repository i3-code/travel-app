import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250,
        borderRadius: 16,
      },
      app: {
        backgroundSize: 'cover',
        transition: '0.4 ease',
      },
    main: {
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))',
      },
      size: {
        padding:0,
        [theme.breakpoints.down('sm')]: {
          width: 20,
          height: 20,
        },
        [theme.breakpoints.between('sm', 'md')]: {
          width: 30,
          height: 30,
        },
        [theme.breakpoints.between('md', 'lg')]: {
          width: 40,
          height: 40,
        },
        [theme.breakpoints.up('lg')]: {
          width: 50,
          height: 50,
        },
      },
      currencyCode: {
        textAlign: 'center',
        position: 'relative',
        display: 'inline-block',
        margin: '2% auto',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        color: '#FFF',
        [theme.breakpoints.down('sm')]: {
          fontSize: 10,
        },
        [theme.breakpoints.between('sm', 'md')]: {
          fontSize: 16,
        },
        [theme.breakpoints.between('md', 'lg')]: {
          fontSize: 22,
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: 26,
        },
        fontWeight: 800,
        textShadow: '3px 6px rgba(50, 50, 70, 0.5)',
        boxShadow: '3px 6px rgba(0, 0, 0, 0.2)',
      },
      currency: {
        color: '#FFF',
        [theme.breakpoints.down('sm')]: {
          fontSize: 8,
        },
        [theme.breakpoints.between('sm', 'md')]: {
          fontSize: 10,
        },
        [theme.breakpoints.between('md', 'lg')]: {
          fontSize: 14,
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: 18,
        },
        fontWeight: 300,
        textAlign: 'center',
        textShadow: '3px 3px rgba(50, 50, 70, 0.5)'
      },
    }));
    export default useStyles;
