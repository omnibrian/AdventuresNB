import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import FacebookProvider, { Comments } from 'react-facebook';
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import { Chip, FlatButton } from 'material-ui';
import Directions from 'material-ui/svg-icons/maps/directions';
import SwipeableViews from 'react-swipeable-views';
import config from '../../config';
import adventures from '../../data/adventures.json';
import AdventureList from '../AdventureList/AdventureList.container';
import PageNotFound from '../PageNotFound/PageNotFound.presentation';
import './AdventureDetail.css';

class AdventureDetail extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    const adventure = adventures.filter((adventure) => (adventure.id === props.match.params.adventureId))[0];

    this.state = {
      adventure,
      imageSlideIndex: 0,
      numSlides: (adventure.photo_urls) ? adventure.photo_urls.length : 1
    };
  }

  componentDidMount() {
    const { timerLength } = this.props;

    setInterval(() => {
      this.setState({
        imageSlideIndex: (this.state.imageSlideIndex + 1) % this.state.numSlides
      });
    }, timerLength);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.adventureId !== this.props.match.params.adventureId) {
      const adventure = adventures.filter((adventure) => (adventure.id === nextProps.match.params.adventureId))[0];

      this.setState({
        adventure,
        imageSlideIndex: 0,
        numSlides: (adventure.photo_urls) ? adventure.photo_urls.length : 1
      });
    }
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

  handleChange(value) {
    this.setState({
      imageSlideIndex: value
    });
  }

  renderDetail(adventure) {
    let lat = '';
    let lng = '';

    if (adventure.name && adventure.short_description && adventure.description) {
      const photoUrls = (adventure.photo_urls && adventure.photo_urls[0]) ?
        adventure.photo_urls : [config.DEFAULT_ADVENTURE_IMAGE];

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
                  subtitle={adventure.short_description} />} >
              <SwipeableViews
                className="SwipeableView"
                index={this.state.imageSlideIndex}
                onChange={this.handleChange}>
                {photoUrls.map((photoUrl) => (
                  <img
                    key={photoUrl}
                    className="CardImage AdventureDetailCardImage"
                    src={photoUrl}
                    alt=""
                    onError={this.handleError} />
                ))}
              </SwipeableViews>
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
          <Card className="Card FacebookCommentsCard" id="Comments">
            <center>
              <FacebookProvider appId={config.FACEBOOK_API_KEY}>
                <Comments href={window.location.href} width="100%" />
              </FacebookProvider>
            </center>
          </Card>
          <div className="DisclaimerNotice">
            <h6>
              This website is for informational purposes only, the creators assume no responsibility
              for any injuries while on any adventures.
            </h6>
          </div>
        </div>
      );
    } else {
      return (<PageNotFound history={this.props.history} />);
    }
  }

  render() {
    const { adventure } = this.state;

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

AdventureDetail.defaultProps = {
  timerLength: 5000
};

AdventureDetail.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  timerLength: PropTypes.number
};

export default AdventureDetail;
