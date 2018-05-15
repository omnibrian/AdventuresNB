import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdventureList from '../AdventureList/AdventureList.container';
import MapView from './MapView.container';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="PageWrapper">
        <div className="AdventureListDrawer">
          <AdventureList {...this.props} />
        </div>

        <div className="MapWrapper">
          <MapView {...this.props} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  adventures: PropTypes.array.isRequired
};

export default Dashboard;
