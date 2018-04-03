import React from 'react';
import chai, { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chaiEnzyme from 'chai-enzyme';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import PageNotFound from './PageNotFound.presentation';

configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());

describe('PageNotFound Component', () => {
  const wrapper = mount(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <PageNotFound history={{}} />
    </MuiThemeProvider>
  );

  it('shows message to user', () => {
    expect(wrapper.find('CardTitle').exists()).to.equal(true);
    expect(wrapper.find('CardTitle')).to.contain.text('Looks like you got lost!');
    expect(wrapper.find('CardTitle')).to.contain.text('We couldn\'t find the page you\'re looking for.');
  });

  it('shows back button', () => {
    expect(wrapper.find('FlatButton').exists()).to.equal(true);
  });
});
