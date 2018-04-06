import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker } from 'react-google-maps';
import { geolocated, geoPropTypes } from 'react-geolocated';
import MarkerWithInfo from './MarkerWithInfo.presentation';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    const { adventures } = this.props;

    const currentLocationIcon = {
      path: 'M-6,0a6,6 0 6,0 12,0a6,6 0 1,0 -12,0',
      fillColor: '#2c00fa',
      fillOpacity: 1,
      scale: 1,
      strokeColor: '#2c00fa',
      strokeWeight: 12,
      strokeOpacity: 0.2
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
                      lng: this.props.coords.longitude
                    }}
                    icon= {currentLocationIcon}
                  />
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

Dashboard.propTypes = {
  adventures: PropTypes.array.isRequired,
  coords: {...Dashboard.propTypes, ...geoPropTypes}
};


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Dashboard);
