import React from 'react';
import App from "../../src/components/App";
import enzyme from 'enzyme';
import { JSDOM } from 'jsdom';
import toJSON from 'enzyme-to-json'
import { compose } from 'redux';
import Adapter from 'enzyme-adapter-react-16';


const { window } = new JSDOM(`...`);
const { document } = (new JSDOM(`...`)).window;

enzyme.configure({ adapter: new Adapter() });
global.window = window;
global.document = document;

describe('<App /> ui component', () => {

   describe('Rendering ui', () => {

      it('Renders Correctly', () => {
         compose(expect, toJSON, enzyme.shallow)(
            <App />
         ).toMatchSnapshot();
      });

      it('Renders div with class .app', () => {
         expect(
            enzyme.mount( <App /> ).
            find('div.app').
            first().length
         ).toBe(1)
      });

      it('Clicking on button does not cause errors', () => {
         enzyme.mount( <App /> ).
         find('button').
         first().
         simulate('click')
      });

   })

});