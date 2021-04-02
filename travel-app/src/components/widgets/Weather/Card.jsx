import React from 'react';
import { Grid, CardMedia, Typography } from '@material-ui/core';
import useStyles from './styles';
import cold from '../../../assets/images/cold-bg.jpg';
import warm from '../../../assets/images/warm-bg.jpg';
const WeatherCard = ({ weatherData }) => {
  const kelvinToFahrenheit = (k) => {
    return Math.round((k - 273.15).toFixed(2));
  };
  const classes = useStyles();

  return !weatherData ? (
    <p>Loading...</p>
  ) : (
    <CardMedia
      className={classes.app}
      image={kelvinToFahrenheit(weatherData.main.temp) > 16 ? warm : cold}
    >
      <Grid className={classes.main}>
        <Grid className={classes.location}>{weatherData.name}</Grid>
        <Grid className={classes.weatherBox}>
          <Grid className={classes.temp}>
            {kelvinToFahrenheit(weatherData.main.temp)}°c
          </Grid>
          <Grid className={classes.weather}>
            <img
              className={classes.img}
              alt="weather"
              src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            />
          </Grid>

          <Typography className={classes.hSmall}>{weatherData.weather[0].description}</Typography>
        </Grid>
      </Grid>
    </CardMedia>
  );
};

WeatherCard.propTypes = {};

export default WeatherCard;
