import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import useStyles from './styles';

import { Container, Grid, Typography, CardMedia } from '@material-ui/core';

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Map from '../partials/Map';
import Slider from '../partials/Slider';
import ErrorPage from '../ErrorPage';
import Loading from '../partials/Loading';

import urls from '../../constants/urls';

import Currency from '../widgets/Currency';
import DateWidget from '../widgets/Date';
import Weather from '../widgets/Weather';

import { DEFAULT_APP_LANG } from '../../constants/languages';

const [countryCache, sightsCache] = [{}, {}];

function getCountryInfo(data, language) {
  const key = data.code || 'key';
  if (!countryCache[key]) countryCache[key] = data;
  let result = countryCache[key];
  if (language !== DEFAULT_APP_LANG) {
    const dataPatch = result.translations ? result.translations[language.slice(0, 2)] : {};
    result = { ...result, ...dataPatch };
  }
  return result;
}

function getSightsInfo(key, data, language) {
  if (!sightsCache[key]) sightsCache[key] = data || [];
  let result = sightsCache[key];
  if (language && language !== DEFAULT_APP_LANG) {
    const lang = language.slice(0, 2);
    result = result.map((sight) => {
      const dataPatch = sight.translations ? sight.translations[lang] : {};
      return { ...sight, ...dataPatch };
    });
  }
  return result;
}

export default function Country() {
  const { code } = useParams();
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const [country, setCountry] = useState({});
  const [sights, setSights] = useState({});
  const [sightsCoordinates, setSightsCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const error = (country === null || !code);
  const classes = useStyles();

  const loadInfo = (CountryInfo, sightsInfo) => {
    setCountry(CountryInfo);
    setSights(sightsInfo);
    const sightsCoop = sightsInfo.map(el => sightsCoop.push({'coordinates': el.сoordinates, 'name': el.name}));
    setSightsCoordinates(sightsCoop);
    setLoading(false);
  }

  useEffect(() => {
    if (!countryCache[code]) {
      axios
      .get(urls.countries.byCode(code))
      .then((response) => {
        const result = response.data || {};
        const CountryInfo = getCountryInfo(result, language);
        const sightsInfo = getSightsInfo(code, CountryInfo.sights, language);
        loadInfo(CountryInfo, sightsInfo);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      const CountryInfo = getCountryInfo({ code }, language);
      const sightsInfo = getSightsInfo(code, CountryInfo.sights, language);
      loadInfo(CountryInfo, sightsInfo);
    }
  }, [code, language]);

  if (error) return <ErrorPage />;
  if (loading) return (
    <Grid>
      <Header />
      <Loading />
      <Footer />
    </Grid>
  );

  const [capitalDesc, capitalName] = [t('PAGE_CAPITAL'), country.capital];
    return (
      <Grid>
        <Header />
        <Container>
          <Grid container spacing={1} className={classes.root}>
            <Grid item xs={9}>
              <Container>
                <Typography variant="h3" className={classes.name}>
                  {country.name}
                </Typography>
                <Grid container direction="column" className={classes.flex}>
                  <CardMedia className={classes.media} image={country.linkToPhoto} title="Contemplative Reptile" />
                  <Typography className={classes.capital}>
                    {capitalDesc}: {capitalName}
                  </Typography>
                </Grid>
                {country.description.map((el, i) => {
                  return (
                    <Typography variant="body1" className={classes.text} key={i}>
                      {el}
                    </Typography>
                  );
                })}
                <Grid container className={classes.player}>
                  <Player src={country.linkToVideo}>
                    <BigPlayButton position="center" />
                  </Player>
                </Grid>
                <Grid>
                  <Slider sights={sights} id={country.id} />
                </Grid>
                <Grid>
                  <Map code={code} capital={capitalName} capitalCoords={country.capitalCoordinates} sightsCoordinates={sightsCoordinates}/>
                </Grid>
              </Container>
            </Grid>
            <Grid item xs={3}>
              <Weather capital={capitalName} lang={language.slice(0, 2)} />
              <DateWidget timeZone={country.timeZone} />
              <Currency currencyCode={country.currency} lang={language} />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Grid>
  );
}
