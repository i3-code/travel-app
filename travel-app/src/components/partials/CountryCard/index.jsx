import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function CountryCard({ countryData, toggleRecorder }) {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  const [capitalDesc, capitalName] = [t('PAGE_CAPITAL'), countryData.capital];

  function handleClick() {
    history.push(`/country/${countryData.code}`);
    toggleRecorder(false)
  }

  return (
    <Box mt={2} mb={2}>
      <Card className={classes.root} onClick={handleClick}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={countryData.linkToPhoto}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {countryData.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
            {capitalDesc}: {capitalName}
            </Typography>
            <Typography variant="body2" component="p">
              {countryData.shortDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
