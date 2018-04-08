import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { Divider, Drawer, List, ListItem, TextField, Slider } from 'material-ui';
import geolib from 'geolib';
import './AdventureList.css';

class AdventureList extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      searchText: this.props.defaultSearchText || '',
      distanceFilter: 420
    };
  }

  handleGotoAdventure(adventureId) {
    const { history } = this.props;

    history.push(`/adventures/${adventureId}`);
  }

  handleSearchChange(event, newValue) {
    this.setState({ searchText: newValue });
  }

  compareSearch(adventure) {
    const searchText = this.state.searchText.toLowerCase();

    return (adventure.name.toLowerCase().includes(searchText) ||
      adventure.short_description.toLowerCase().includes(searchText) ||
      adventure.description.toLowerCase().includes(searchText) ||
      (adventure.tags &&
        adventure.tags.reduce((acc, next) => acc || next.toLowerCase().includes(searchText), false)));
  }

  compareDistance(adventure) {
    return(
      this.state.distanceFilter*1000 > geolib.getDistance(
        {latitude: 45.982883, longitude: -66.660724}, //Enter user's location here
        {latitude: adventure.location.latitude, longitude: adventure.location.longitude})
    );
  }

  renderList(adventures) {
    const searchedAdventures = adventures.filter((adventure) => this.compareSearch(adventure)).filter(
      (adventure) => this.compareDistance(adventure));

    if (searchedAdventures.length > 0) {
      return (
        <List>
          {searchedAdventures.map((adventure) => (
            <ListItem
              key={adventure.id}
              primaryText={adventure.name}
              secondaryText={adventure.short_description}
              secondaryTextLines={1}
              onClick={() => this.handleGotoAdventure(adventure.id)} />
          )).reduce((acc, listitem) =>
            (acc == null) ? [listitem] : [acc, <Divider key={acc.length} />, listitem], null)}
        </List>
      );
    } else {
      return (
        <List>
          <ListItem
            primaryText="No matching adventures found"
            disabled={true} />
        </List>
      );
    }
  }

  handleDistanceSlider = (event, value) => {
    this.setState({distanceFilter: value});
  };

  render() {
    const { adventures } = this.props;

    return (
      <Drawer
        docked={true}
        open={true}
        containerClassName="AdventureListContainer">
        <div className="SearchDiv">
          <TextField
            floatingLabelText="Search"
            fullWidth={true}
            onChange={this.handleSearchChange} />
        </div>
        <h4>Distance: {this.state.distanceFilter.toFixed(0)}km</h4>
        <Slider
          max={420}
          onChange={this.handleDistanceSlider}
          className="DistanceSlider"
          defaultValue={this.state.distanceFilter}
        />
        {this.renderList(adventures)}
      </Drawer>
    );
  }
}

AdventureList.propTypes = {
  adventures: PropTypes.array.isRequired,
  defaultSearchText: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default AdventureList;
