import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/AppContainer';
import storeFactory from './store';

const store = storeFactory(false, {counter: 0});

render(
   <Provider store={store}>
      <App/>
   </Provider>,
   document.getElementById('root')
);


