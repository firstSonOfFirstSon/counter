import counter from '../../../src/store/reducers';
import c from '../../../src/utils/constants';
import deepFreeze from 'deep-freeze';

describe('counter reducer', () => {

   it('Increment counter success', () => {
      const state = 8;
      const action = {
         type: c.INCREMENT
      };

      deepFreeze(action);
      expect( counter(state, action) ).toBe(state + 1);
   });

   it('Decrement counter success', () => {
      const state = 8;
      const action = {
         type: c.DECREMENT
      };

      deepFreeze(action);
      expect( counter(state, action) ).toBe(state - 1);
   });
});