import React from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  CardMedia,
} from '@material-ui/core';
import usaIcon from '../../../assets/images/usa.png';
import ecIcon from '../../../assets/images/ecIcon.png';
import rubIcon from '../../../assets/images/rubIcon.png';
import useStyles from './styles';

const currLanguages = {
  'ru-RU': {
    USD: 'долл. США',
    EUR: 'ЕВРО',
    RUB: 'pocc. руб.',

  },
  'de-DE': {
    USD: 'US Dollar',
    EUR: 'EUR',
    RUB: 'REIBEN',
  }
};

const CurrencyCard = ({ currencyData, currencyCode, lang }) => {
  const classes = useStyles();
  return !currencyData ? (
    <p>Loading...</p>
  ) : (
    <CardMedia className={classes.app}>
      <Grid className={classes.main}>
      <Grid className={classes.currencyCode}>
        1 {currencyCode}
        </Grid>
        {currencyData.map((el, i) => {
          const currencyLang = (lang === 'en-US') ? el.key : currLanguages[lang][el.key];
          return (
            <List key={i} style={{ padding: '0'}}>
              <ListItem style={{padding:'0', marginLeft:'1vw'}}>
                <Grid>
                  <Avatar className={classes.size} alt='flag'
                    src={
                      el.key === 'USD'
                        ? usaIcon
                        : el.key === 'EUR'
                        ? ecIcon
                        : rubIcon
                    }
                  />
                </Grid>
                <ListItemText
                  primary={
                    <Typography className={classes.currency}>
                      {currencyLang}
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.currency}>
                      {el.value}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          );
        })}
      </Grid>
    </CardMedia>
  );
};

CurrencyCard.propTypes = {};

export default CurrencyCard;
