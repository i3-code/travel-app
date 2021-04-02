import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, Grid, MenuItem, Select } from '@material-ui/core';

import { LANGUAGES } from '../../../constants/languages';
import useStyles from './styles';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const classes = useStyles();
  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const renderLangOptions = () =>
    LANGUAGES.map((lang) => (
      <MenuItem key={lang.type} value={lang.type}>
        <Grid container alignItems="center" justify="flex-start">
          <img
            src={`${process.env.PUBLIC_URL}/icons/flags/${lang.type.slice(0, 2)}.svg`}
            alt={lang.type}
            className={classes.flag}
          />
          {lang.label}
        </Grid>
      </MenuItem>
    ));

  return (
    <FormControl className={classes.root} variant="outlined" color="primary">
      <Select value={i18n.language || ''} onChange={handleLangChange}>
        {renderLangOptions()}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
