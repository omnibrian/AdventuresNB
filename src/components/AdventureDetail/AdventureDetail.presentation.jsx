import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import { Chip, FlatButton } from 'material-ui';
import { Directions } from 'material-ui-icons';
import config from '../../config';
import adventures from '../../data/adventures.json';
import AdventureList from '../AdventureList/AdventureList.container';
import PageNotFound from '../PageNotFound/PageNotFound.presentation';
import './AdventureDetail.css';

class AdventureDetail extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      errored: false
    };
  }

  minutesToTime(time) {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;

    let hoursTag = (hours > 1) ? 'hours' : 'hour';
    let minutesTag = (minutes > 1) ? 'minutes' : 'minute';

    let hoursString = (hours > 0) ? `${hours} ${hoursTag}` : '';
    let minutesString = (minutes > 0) ? `${minutes} ${minutesTag}` : '';

    return `${hoursString} ${minutesString}`;
  }

  renderTags(tags) {
    return (
      <CardText className="TagsWrapper">
        {tags.map((tag) => (<Chip key={tag} className="Tag">{tag}</Chip>))}
      </CardText>
    );
  }

  handleError() {
    this.setState({ errored: true });
  }

  renderDetail(adventure) {
    let lat = '';
    let lng = '';

    if (adventure.name && adventure.short_description && adventure.description) {
      const photoUrl = (adventure.photo_urls && adventure.photo_urls[0]) ?
        adventure.photo_urls[0] : config.DEFAULT_ADVENTURE_IMAGE;

      if (adventure.location) {
        lat = adventure.location.latitude;
        lng = adventure.location.longitude;
      }

      return (
        <div>
          <Card className="Card AdventureInfoCard" id="Info">
            <CardMedia
              overlay={
                <CardTitle
                  className="AdventureDetailCardOverlayTitle"
                  title={adventure.name}
                  subtitle={adventure.short_description} />
              } >
              <img
                className="CardImage AdventureDetailCardImage"
                src={this.state.errored ? config.DEFAULT_ADVENTURE_IMAGE : photoUrl}
                alt=""
                onError={this.handleError} />
            </CardMedia>
            <CardText>{adventure.description}</CardText>
            {adventure.length &&
              <CardTitle
                title="Length"
                subtitle={adventure.length + 'km'} />}
            {adventure.time && adventure.time > 0 &&
              <CardTitle
                title="Time"
                subtitle={this.minutesToTime(adventure.time)} />}
            {adventure.tags && this.renderTags(adventure.tags)}
            {adventure.location &&
              <CardActions>
                <FlatButton
                  className="DirectionsButton"
                  label="Directions"
                  icon={<Directions />}
                  href={`https://www.google.ca/maps/dir/?api=1&destination=${lat},${lng}`}
                  target="_blank"
                  primary={true} />
              </CardActions>}
          </Card>
          {adventure.map &&
            <Card className="Card MapCard">
              <CardMedia>
                <iframe
                  id="map"
                  title="Adventure Map"
                  src={adventure.map}
                  width="100%"
                  height="480" />
              </CardMedia>
            </Card>}
        </div>
      );
    } else {
      return (<PageNotFound history={this.props.history} />);
    }
  }

  render() {
    const { match } = this.props;

    const adventure = adventures.filter((adventure) => (adventure.id === match.params.adventureId))[0];

    return (
      <div className="DetailPageContainer">
        <div className="AdventureListDrawer">
          <AdventureList {...this.props} />
        </div>
        <div className="AdventureDetailContainer">
          {this.renderDetail(adventure)}
        </div>
      </div>
    );
  }
}

export default AdventureDetail;
