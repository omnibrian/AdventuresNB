import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AppBarMenu from '../components/AppBarMenu/AppBarMenu.presentation';
import Dashboard from '../components/Dashboard/Dashboard.container';
import PageNotFound from '../components/PageNotFound/PageNotFound.presentation';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBarMenu />
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
