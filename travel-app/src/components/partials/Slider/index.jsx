import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import SliderCard from './SliderCard';

import urls from '../../../constants/urls';
import { UserContext } from '../../../contexts/UserContext';

import './index.css';
import useStyles from './style';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import { Grid, IconButton } from '@material-ui/core';

export default function SliderComponent(props) {
  const { sights, id } = props;
  const [scores, setScores] = useState({});
  const [user] = useContext(UserContext);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleFs = useFullScreenHandle();
  const [fsState, setFsState] = useState(handleFs.active);
  const classes = useStyles();

  const handleSetScores = (newState) => {
    setScores((event, oldState) => {
      return {...oldState, ...newState };
    });
  }

  const getScores = (sightId) => {
    const sightScores = scores[sightId];
    return sightScores?.scores || [];
  };

  const average = (sightId) => {
    const sightScores = scores[sightId];
    return sightScores?.averageValue || 0;
  };

  const value = (sightId) => {
    const sightScores = scores[sightId];
    const scoresData = ( sightScores && sightScores.scores) ? sightScores.scores : [];
    for(const scoreRecord of scoresData) {
      if (scoreRecord.username === user?.username) return scoreRecord.value;
    }
    return 0;
  };

  const getScoresFromApi = useCallback(() => {
    axios
    .get(urls.scores.byId(id))
    .then((response) => {
      handleSetScores(response.data || {})
    })
    .catch((error) => {
      console.log(error);
    });
  },[id])

  const setValue = async (event, newValue) => {
    if(user) {
      const score = {
        userId: user.id,
        countryId: id,
        sightId: sights[currentSlide].id,
        value: newValue,
      }
      try {
        await axios.post(urls.scores.all, score, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })

        getScoresFromApi();
      } catch(err) {
        console.log(err)
      }
    }
  };

  useEffect(() => {
    getScoresFromApi();
  }, [getScoresFromApi]);

  let slider1;
  let slider2;

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: slide => setCurrentSlide(slide),
  };

  const settingsSmall = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }

  const trackFs = useCallback((state) => setFsState(state), []);
  const toggleFs = () => {
    if (handleFs.active) {
      handleFs.exit();
      return;
    }
    handleFs.enter();
  };

  return (
    <div>
      <FullScreen handle={handleFs} onChange={trackFs}>
        <Grid className={classes.fsWrapper}>
          <IconButton onClick={toggleFs} className={classes.fsButton} color="primary">
            {fsState ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Grid>
          <Slider
            {...settings}
            asNavFor={nav2}
            ref={slider => (slider1 = slider)}
            className={'slider-large'}
          >
            {sights.map((card) => (
              < SliderCard
                key={card.id}
                imgUrl={card.linkToPhoto}
                name={card.name}
                description={card.description}
                size={'large'}
                average={average(card.id)}
                value={value(card.id)}
                getScores={getScores(card.id)}
                setValue={setValue}
              />
            ))}
          </Slider>
      </FullScreen>
      <Slider
      {...settingsSmall}
      className={'slider-small'}
      asNavFor={nav1}
      ref={slider => (slider2 = slider)}
    >
      {sights.map((card) => (
        < SliderCard key={card.id} imgUrl={card.linkToPhoto} size={'small'}/>
      ))}
    </Slider>
  </div>
  );
}

