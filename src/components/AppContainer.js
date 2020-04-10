import {increment, decrement} from '../utils/actionCreators';
import {connect} from 'react-redux';
import App from './App';

const AppContainer = connect(
   ({counter}) => ({counter}),
   (dispatch) => ({
      increment() {
         dispatch( increment() )
      },
      decrement() {
         dispatch( decrement() )
      }
   })
)(App);

export default AppContainer;