import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import config from '../../config';
import MapView from './MapView.presentation';

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_API_KEY}&` +
      'v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div />,
    containerElement: <div className="MapContainer" />,
    mapElement: <div className="MapElement" />
  }),
  withScriptjs,
  withGoogleMap
)(MapView);
