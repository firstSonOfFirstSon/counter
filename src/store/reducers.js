import c from '../utils/constants';

const counter = (state = 0, action = { type: null }) => {
   switch (action.type) {
      case c.INCREMENT:
         return state + 1;
      case c.DECREMENT:
         return state - 1;
      case c.RESET:
         return 0;
      default:
         return state;
   }
};


export default counter;