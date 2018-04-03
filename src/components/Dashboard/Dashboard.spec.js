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
        <Dashboard />
      </MemoryRouter>
    </MuiThemeProvider>
  );

  it('shows a map', () => {
    expect(wrapper.find('withScriptjs(withGoogleMap(withProps(Dashboard)))').exists()).to.equal(true);
  });
});
