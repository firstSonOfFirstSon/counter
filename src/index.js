import React from 'react';
import { hydrate } from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/AppContainer';
import storeFactory from './store';

const store = storeFactory(false, window.__INITIAL_STATE__);

hydrate(
   <Provider store={store}>
      <App/>
   </Provider>,
   document.getElementById('root')
);


