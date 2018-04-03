import React, { Component } from 'react';
import autobind from 'react-autobind';
import { withRouter } from 'react-router-dom';
import { Marker, InfoWindow } from 'react-google-maps';
import { RaisedButton } from 'material-ui';
import './Dashboard.css';

class MarkerWithInfo extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      errored: false,
      open: false
    };
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  handleError() {
    this.setState({
      errored: true
    });
  }

  handleGotoAdventure() {
    const { history, adventure } = this.props;

    history.push(`/adventures/${adventure.id}`);
  }

  render() {
    const { adventure } = this.props;

    const location = adventure.location;

    if (!location) {
      return (<div />);
    }

    return (
      <Marker
        position={{
          lat: location.latitude,
          lng: location.longitude
        }}
        onClick={this.toggleOpen} >
        {
          this.state.open &&
          <InfoWindow onCloseClick={this.toggleOpen}>
            <span>
              {
                this.state.errored ||
                (adventure.photo_urls && adventure.photo_urls[0] &&
                  <img
                    className="InfoWindowImage"
                    src={adventure.photo_urls[0]}
                    alt={adventure.name}
                    onError={this.handleError}
                    onClick={this.handleGotoAdventure} />
                )
              }
              <span>
                <RaisedButton
                  label={adventure.name}
                  onClick={this.handleGotoAdventure}
                  fullWidth={true}
                  primary={true}
                  labelStyle={{
                    display: 'block',
                    overflow: 'hidden',
                    whitespace: 'nowrap'
                  }} />
              </span>
            </span>
          </InfoWindow>
        }
      </Marker>
    );
  }
}

export default withRouter(MarkerWithInfo);
