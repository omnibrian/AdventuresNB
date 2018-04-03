import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import './PageNotFound.css';

class PageNotFound extends Component {
  render() {
    const { history } = this.props;

    return (
      <div className="PageNotFoundCardBorders">
        <Card className="PageNotFoundCard">
          <CardTitle
            title="Looks like you got lost!"
            subtitle="We couldn't find the page you're looking for." />
          <CardActions>
            <FlatButton
              label="Go Back"
              primary={true}
              onClick={history.goBack} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired
};

export default PageNotFound;
