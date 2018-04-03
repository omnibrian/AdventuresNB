import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AppBarMenu from '../components/AppBarMenu/AppBarMenu.presentation';
import App from '../components/app/App';
import PageNotFound from '../components/PageNotFound/PageNotFound.presentation';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBarMenu />
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard" component={App} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
