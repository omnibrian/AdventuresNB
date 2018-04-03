import React from 'react';
import ReactDOM from 'react-dom';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import {
  lightGreen900,
  lightGreen700,
  grey700,
  darkBlack,
  blueGrey700,
  white,
  grey300
} from 'material-ui/styles/colors';
import Router from './router/Router';
import registerServiceWorker from './util/registerServiceWorker';
import './index.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen900,
    primary2Color: lightGreen700,
    primary3Color: grey700,
    accent1Color: blueGrey700,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router />
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
