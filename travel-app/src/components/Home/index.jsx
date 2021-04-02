import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid } from '@material-ui/core';
import axios from 'axios';

import useStyles from './styles';

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import CountryCard from '../partials/CountryCard';

import { useTranslation } from 'react-i18next';
import urls from '../../constants/urls';
import Loading from '../partials/Loading';
import { LANGUAGES, DEFAULT_DB_LANG } from '../../constants/languages';

const getTranslatedCountry = (countryData, language) => {
  const shortLang = LANGUAGES.find((lang) => lang.type === language).short;
  return shortLang === DEFAULT_DB_LANG ? countryData : { ...countryData, ...countryData.translations[shortLang] };
};

export default function Country() {
  const [isPending, setIsPending] = useState(true);
  const [countries, setCountries] = useState([]);
  const [translatedCountries, setTranslatedCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [recorder, toggleRecorder] = useState(false);
  const {
    i18n: { language },
  } = useTranslation();
  const classes = useStyles();

  const filterCountries = useCallback((countryList) =>
    setFilteredCountries(
      countryList.filter(
        (country) =>
          country.name.toLowerCase().includes(searchValue) || country.capital.toLowerCase().includes(searchValue),
      ),
  ), [searchValue]);

  const setNewTranslatedCountries = useCallback((data) => {
    const newTranslatedCountries = data.map((country) => getTranslatedCountry(country, language));
    setTranslatedCountries(newTranslatedCountries);
    filterCountries(newTranslatedCountries);
  }, [filterCountries, language]);


  useEffect(() => {
    const getCountryData = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(urls.countries.all);
        setNewTranslatedCountries(response.data);
        setCountries(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsPending(false);
      }
    };
    getCountryData();
  }, [setNewTranslatedCountries]);

  useEffect(() => {
    setNewTranslatedCountries(countries);
  }, [countries, setNewTranslatedCountries]);

  useEffect(() => {
    filterCountries(translatedCountries);
  }, [filterCountries, translatedCountries]);

  return (
    <Grid container direction="column" justify="space-between" alignItems="stretch">
      <Header onSearch={setSearchValue} homePage={true} recorder={recorder} toggleRecorder={toggleRecorder}/>
      <Grid className={classes.root}>
        {isPending && <Loading />}
        <Container>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            {filteredCountries.map((country) => (
              <CountryCard countryData={country} key={country.id} toggleRecorder={toggleRecorder}/>
            ))}
          </Grid>
        </Container>
      </Grid>
      <Footer />
    </Grid>
  );
}
