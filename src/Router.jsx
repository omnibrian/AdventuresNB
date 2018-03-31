import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard" component={App} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
