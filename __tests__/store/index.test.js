import storeFactory from '../../src/store/index';
import {increment, decrement} from '../../src/utils/actionCreators'
import deepFreeze from 'deep-freeze';

describe('Store tests', () => {

   describe('increment action dispatch testing', () => {
      let store;
      let action;
      const initialState = {
         counter: 8
      };
      beforeAll( () => {
         store = storeFactory(false, initialState);
         action = increment();
         deepFreeze(action);
         deepFreeze(initialState);
         store.dispatch(action);
      } );

      it('counter should increase by 1', () => {
         expect( store.getState().counter ).toBe(9);
      });
   });

   describe('decrement action dispatch testing', () => {
      let store;
      let action;
      const initialState = {
         counter: 8
      };
      beforeAll( () => {
         store = storeFactory(false, initialState);
         action = decrement();
         deepFreeze(action);
         deepFreeze(initialState);
         store.dispatch(action);
      } );

      it('counter should decrease by 1', () => {
         expect( store.getState().counter ).toBe(7);
      });
   });
});
