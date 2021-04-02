import React, { useCallback, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import ReactMapboxGl, { Layer, Source, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import useStyles from './styles';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import { MAPBOX_ACCESS_TOKEN } from '../../../constants/tokens';

import { Grid, IconButton, Tooltip } from '@material-ui/core';
const MapBox = ReactMapboxGl({ accessToken: MAPBOX_ACCESS_TOKEN });

const COUNTRY_BONDS_SOURCE = {
  type: 'vector',
  url: 'mapbox://mapbox.country-boundaries-v1',
};

const paint = {
  'fill-color': '#ff00ff',
  'fill-opacity': 0.15,
};

export default function Map(props) {
  const handleFs = useFullScreenHandle();
  const [fsState, setFsState] = useState(handleFs.active);
  const { code, capital, capitalCoords, sightsCoordinates } = props;
  const classes = useStyles();

  const filter = ['==', 'iso_3166_1', code.toUpperCase()];

  const trackFs = useCallback((state) => setFsState(state), []);
  const toggleFs = () => {
    if (handleFs.active) {
      handleFs.exit();
      return;
    }
    handleFs.enter();
  };
  return (
    <FullScreen handle={handleFs} onChange={trackFs}>
      <Grid className={classes.fsWrapper}>
        <IconButton onClick={toggleFs} className={classes.fsButton} color="primary">
          {fsState ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Grid>
      <MapBox
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/satellite-streets-v11?optimize=true"
        zoom={[4]}
        className={classes.mapBox}
        center={capitalCoords}
        onStyleLoad={(map) => map.resize()}
      >
        {sightsCoordinates.map((sight) => {
          return (
          <Marker key={sight.name} coordinates={sight.coordinates} className={classes.marker} >
            <Tooltip title={sight.name}>
              <img src="./icons/marker.svg" alt="sight marker" />
            </Tooltip>
          </Marker>)
        })}
        <Marker coordinates={capitalCoords} className={classes.marker}>
          <Tooltip title={capital}>
            <img src="./icons/pin.svg" alt="Capital marker" />
          </Tooltip>
        </Marker>
        <Source id="country-bonds" tileJsonSource={COUNTRY_BONDS_SOURCE} />
        <Layer
          type="fill"
          sourceId="country-bonds"
          paint={paint}
          sourceLayer="country_boundaries"
          filter={filter}
        >
        </Layer>
      </MapBox>
    </FullScreen>
  );
}
