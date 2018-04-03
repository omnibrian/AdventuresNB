import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import './AppBarMenu.css';

class AppBarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleGoto(route) {
    const { history } = this.props;

    if (history.location.pathname !== route) {
      history.push(route);
    } else {
      this.setState({ open: false });
    }
  }

  render() {
    return (
      <div>
        <AppBar
          className="AppBar"
          title={<span className="TitleSpan">Adventures NB</span>}
          onTitleClick={() => this.handleGoto('/dashboard')}
          onLeftIconButtonClick={() => this.setState({ open: true })} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })} >
          <AppBar
            title={<span className="TitleSpan">Menu</span>}
            onLeftIconButtonClick={() => this.setState({ open: false })} />
          <MenuItem onClick={() => this.handleGoto('/dashboard')}>Map</MenuItem>
        </Drawer>
      </div>
    );
  }
}

AppBarMenu.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(AppBarMenu);
