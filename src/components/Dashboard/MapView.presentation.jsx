import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap } from 'react-google-maps';
import MarkerWithInfo from './MarkerWithInfo.presentation';

class MapView extends Component {
  render() {
    const { adventures } = this.props;

    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: 46.542009, lng: -66.234974 }} >
        {adventures.map((adventure) => {
          let location = adventure.location;

          if (location && location.latitude && location.longitude) {
            return (
              <MarkerWithInfo
                key={adventure.id}
                adventure={adventure} />
            );
          }
        })}
      </GoogleMap>
    );
  }
}

MapView.propTypes = {
  adventures: PropTypes.array.isRequired
};

export default MapView;
