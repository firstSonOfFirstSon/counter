import {update} from '../utils/actions';
import {connect} from 'react-redux';
import App from './App';

const AppContainer = connect(
   ({counter}) => ({counter}),
   (dispatch) => ({
      update(value) {
         dispatch( update(value) )
      }
   })
)(App);

export default AppContainer;