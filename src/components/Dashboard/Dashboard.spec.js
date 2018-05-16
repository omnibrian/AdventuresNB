import React from 'react';
import { MemoryRouter } from 'react-router';
import chai, { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chaiEnzyme from 'chai-enzyme';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Dashboard from './Dashboard.container';

configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());

describe('Dashboard Component', () => {
  const wrapper = mount(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MemoryRouter>
        <Dashboard history={{}} />
      </MemoryRouter>
    </MuiThemeProvider>
  );

  it('shows a map', () => {
    expect(wrapper.find('withProps(withScriptjs(withGoogleMap(MapView)))').exists()).to.equal(true);
  });

  it('shows adventure list', () => {
    expect(wrapper.find('withProps(AdventureList)'));
  });
});
