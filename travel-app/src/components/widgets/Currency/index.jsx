import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@material-ui/core';
import useStyles from './styles';
import CurrencyCard from './Card';

const currencyFindCode = ['EUR', 'USD', 'RUB'];

function Currency({ currencyCode, lang }) {
  const [currencyData, setCurrencyData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${currencyCode}`)
      .then((response) => {
        const result = [];
        for (let key in response.data.rates) {
          if (response.data.rates.hasOwnProperty(key)) {
            currencyFindCode.forEach((el) => {
              if (el === key && el !== currencyCode)
                result.push({
                  key: `${key}`,
                  value: `${response.data.rates[key]}`,
                });
            });
          }
        }
        setCurrencyData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currencyCode]);

  return (
    <Card className={classes.root}>
      <CurrencyCard currencyData={currencyData} currencyCode={currencyCode} lang={lang} />
    </Card>
  );
}

export default Currency;
