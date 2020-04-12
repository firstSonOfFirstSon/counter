import counter from '../../../src/store/reducers';
import c from '../../../src/utils/constants';
import deepFreeze from 'deep-freeze';

describe('counter reducer', () => {

   it('Increment counter success', () => {
      const state = 8;
      const action = {
         type: c.UPDATE,
         value: 9
      };

      deepFreeze(action);
      expect( counter(state, action) ).toBe(state + 1);
   });

   it('Decrement counter success', () => {
      const state = 8;
      const action = {
         type: c.UPDATE,
         value: 7
      };

      deepFreeze(action);
      expect( counter(state, action) ).toBe(state - 1);
   });
});