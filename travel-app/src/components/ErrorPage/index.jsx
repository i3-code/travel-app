import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import useStyles from './style';

import { useTranslation } from 'react-i18next';

import { Grid, Box, Typography } from '@material-ui/core';

export default function ErrorPage() {
  const { t } = useTranslation();
  const classes = useStyles();

  return(
    <Grid
      container
      direction="column"
      className={classes.root}
    >
      <Header />
      <Box className={classes.info}>
        <Grid className={classes.line}>
          <Typography className={classes.err}>4</Typography>
          <i className={`far fa-question-circle fa-spin ${classes.icon}`}></i>
          <Typography className={classes.err}>4</Typography>
        </Grid>
          <Typography>{t('PAGE_ERROR.SORRY')}</Typography>
          <Typography>{t('PAGE_ERROR.GO')} <Link to="/">{t('PAGE_ERROR.HOME')}</Link> {t('PAGE_ERROR.TRY')}</Typography>
      </Box>
    </Grid>
  )
}
