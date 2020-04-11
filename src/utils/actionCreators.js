import c from './constants';

export const increment = () => ({
   type: c.INCREMENT
});

export const decrement = () => ({
   type: c.DECREMENT
});

export const reset = () => ({
  type: c.RESET
})