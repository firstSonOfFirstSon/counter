import c from '../utils/constants';

const counter = (state = 0, action = { type: null }) => {
   switch (action.type) {
      case c.UPDATE:
         return action.value;
      default:
         return state;
   }
};


export default counter;