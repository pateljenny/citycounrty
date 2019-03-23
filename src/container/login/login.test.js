import React from 'react';
import { App } from './App.js';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

const wrapper = shallow(<App />);

describe('App component', () => {
  it('starts with a count of 0', () => {
    const text = wrapper.find('p').text();
    expect(text).toEqual('Count: 0');
  });
});
