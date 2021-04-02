import React from 'react';
import useStyles from './styles';
import { Box, Card, Typography } from '@material-ui/core/';
import Rating from './Rating';

export default function SliderCard({imgUrl, size, name, description, average, value, handleBackdrop, getScores, setValue}) {
  const classes = useStyles();

  const sectionStyle = {
    background: `url(${imgUrl}) no-repeat center center`,
    backgroundSize: 'cover',
  };

  const showRating = (size === 'large');
  return (
    <div>
      <Box style={ sectionStyle } className={classes[size]} m={1} >
        { showRating && <Rating {...{average, value, setValue, getScores, handleBackdrop}}/> }
        { name && description
        && <Card className={classes.card} >
            <Typography gutterBottom variant="h5" className={classes.name}>{name}</Typography>
            <Typography className={classes.text}>{description}</Typography>
           </Card>
        }
      </Box>
    </div>
  )
}
