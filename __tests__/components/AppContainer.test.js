import React from 'react';
import AppContainer from "../../src/components/AppContainer";
import enzyme from 'enzyme';
import { JSDOM } from 'jsdom';
import toJSON from 'enzyme-to-json'
import { compose } from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import c from "../../src/utils/constants";

const { window } = new JSDOM(`...`);
const { document } = (new JSDOM(`...`)).window;

enzyme.configure({ adapter: new Adapter() });
global.window = window;
global.document = document;

jest.mock('../../src/utils/actions', () => ({
   update: (value) => ({
      type: 'UPDATE',
      value
   })
}) );
jest.mock('../../src/components/App');


describe('<AppContainer /> component', () => {

   const store = {
      getState: () => ({
         counter: 8
      }),
      dispatch: jest.fn(),
      subscribe: jest.fn()
   };
   let wrapper;

   beforeEach( () => {
      wrapper = enzyme.mount(<Provider store={store}>
                         <AppContainer />
                      </Provider>);
   });

   afterEach( () => {
      jest.resetAllMocks();
   });

   it('Renders counter = 8', () => {
      expect( wrapper.find('AppMock').props().counter ).toBe(8);
   })

   it('Dispatching UPDATE action', () => {
      wrapper.find('AppMock').props().update(9);
      expect( store.dispatch.mock.calls[0][0] ).toEqual({
         type: 'UPDATE',
         value: 9
      })
   });

});