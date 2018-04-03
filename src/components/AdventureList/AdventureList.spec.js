import React from 'react';
import chai, { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chaiEnzyme from 'chai-enzyme';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import AdventureList from './AdventureList.presentation';

configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());

const adventure1 = {
  'id': 'testingid1',
  'name': 'Adventure1',
  'description': 'First Description',
  'short_description': 'First Short Description'
};

const adventure2 = {
  'id': 'testingid2',
  'name': 'Adventure2',
  'description': 'Second description',
  'short_description': 'Second Short description',
  'length': 100,
  'time': 60,
  'tags': [
    'tag1',
    'tag2',
    'waterfall'
  ]
};

const mountAdventureList = (adventures, searchText) => {
  return mount(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AdventureList
        adventures={adventures}
        defaultSearchText={searchText}
        history={{}} />
    </MuiThemeProvider>
  );
};

describe('AdventureList Component', () => {
  const wrapperMount = mountAdventureList([]);

  const wrapperMount1 = mountAdventureList([adventure1], '');
  const wrapperMount2 = mountAdventureList([adventure1, adventure2], '');
  const wrapperMount3 = mountAdventureList([adventure1, adventure2], 'Adventure1');
  const wrapperMount4 = mountAdventureList([adventure1, adventure2], 'Adventure');
  const wrapperMount5 = mountAdventureList([adventure1, adventure2], 'first short description');
  const wrapperMount6 = mountAdventureList([adventure1, adventure2], 'Short');
  const wrapperMount7 = mountAdventureList([adventure1, adventure2], 'First Description');
  const wrapperMount8 = mountAdventureList([adventure1, adventure2], 'desc');
  const wrapperMount9 = mountAdventureList([adventure1, adventure2], 'Bogus');
  const wrapperMount10 = mountAdventureList([adventure1, adventure2], 'waterfall');
  const wrapperMount11 = mountAdventureList([adventure1, adventure2], 'water');

  it('has search bar and list in a drawer', () => {
    expect(wrapperMount.find('TextField').exists()).to.equal(true);
    expect(wrapperMount.find('List').exists()).to.equal(true);
  });

  it('can display single adventure in list', () => {
    expect(wrapperMount1.find('ListItem')).to.have.length(1);
    expect(wrapperMount1.find('Divider')).to.have.length(0);
  });

  it('can display multiple adventures in list', () => {
    expect(wrapperMount2.find('ListItem')).to.have.length(2);
    expect(wrapperMount2.find('Divider')).to.have.length(1);
  });

  it('can filter adventures by name', () => {
    expect(wrapperMount3.find('TextField').prop('floatingLabelText')).to.equal('Search');
    expect(wrapperMount3.find('ListItem')).to.have.length(1);
  });

  it('can filter by name substring', () => {
    expect(wrapperMount4.find('ListItem')).to.have.length(2);
  });

  it('can filter by short_description with case insensitivity', () => {
    expect(wrapperMount5.find('ListItem')).to.have.length(1);
  });

  it('can filter short_description substring', () => {
    expect(wrapperMount6.find('ListItem')).to.have.length(2);
  });

  it('can filter by description', () => {
    expect(wrapperMount7.find('ListItem')).to.have.length(1);
  });

  it('can filter by description substring', () => {
    expect(wrapperMount8.find('ListItem')).to.have.length(2);
  });

  it('displays no results when no search matches exist', () => {
    expect(wrapperMount9.find('ListItem')).to.have.length(1);
    expect(wrapperMount9.find('ListItem').at(0)).contains.text('No matching adventures found');
  });

  it('can filter by tag', () => {
    expect(wrapperMount10.find('ListItem')).to.have.length(1);
  });

  it('can filter by tag substring', () => {
    expect(wrapperMount11.find('ListItem')).to.have.length(1);
  });
});
