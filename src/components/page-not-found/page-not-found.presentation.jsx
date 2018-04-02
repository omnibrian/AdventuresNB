import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import './page-not-found.css';

class PageNotFound extends Component {
  render() {
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
              onClick={browserHistory.goBack} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default PageNotFound;
