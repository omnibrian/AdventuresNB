import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import { GoogleMap, Marker } from 'react-google-maps';
import MarkerWithInfo from './MarkerWithInfo.presentation';

class MapView extends Component {
  render() {
    const { adventures } = this.props;

    const currentLocationIcon = {
      path: 'M-6,0a6,6 0 6,0 12,0a6,6 0 1,0 -12,0',
      fillColor: '#137ed9',
      fillOpacity: 1,
      scale: 1,
      strokeColor: '#ffffff',
      strokeWeight: 1,
      strokeOpacity: 1
    };

    return (
      <div>
        <div className="MapWrapper">
          <GoogleMap
            defaultZoom={7}
            defaultCenter={{ lat: 46.542009, lng: -66.234974 }} >
            {!this.props.isGeolocationAvailable
              ? <div>Your browser does not support Geolocation</div>
              : !this.props.isGeolocationEnabled
                ? <div>Geolocation is not enabled</div>
                : this.props.coords
                  ? <Marker
                    position={{
                      lat: this.props.coords.latitude,
                      lng: this.props.coords.longitude,
                    }}
                    icon= {currentLocationIcon}
                  />
                  && this.setState({userLocation: {lat: this.props.coords.latitude, lng: this.props.coord.longitude}})
                  : <div />
            }

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
        </div>
      </div>
    );
  }
}

MapView.propTypes = {
  adventures: PropTypes.array.isRequired,
  coords: {...MapView.propTypes, ...geoPropTypes}
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(MapView);
