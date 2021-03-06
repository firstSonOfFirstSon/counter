import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import storeFactory from '../store';
import initialState from '../../data/initialState.json';
import {Provider} from 'react-redux';
import api from './counter-api';
import AppContainer from '../components/AppContainer';

const serverStore = storeFactory(true, initialState);
serverStore.subscribe( () => {
   fs.writeFile(
      DIR_INITIAL_STATE,
      JSON.stringify( serverStore.getState() ),
      (error) => error ? console.log('Error saving state!', error) : null
   )
});
const staticCss = fs.readFileSync(DIR_STATIC_FILES + '/bundle.css');
const fileAssets = express.static( DIR_STATIC_FILES );
const logger = (req, res, next) => {
   console.log(`${req.method} request for '${req.url}'`);
   next();
};
const addStoreToRequestPipline = (req, res, next) => {
   req.store = serverStore;
   next();
};
const compose = (...fns) => arg =>
      fns.reduce( (prevRes, fn) => fn(prevRes), arg);
const makeClientStoreFrom = (store) => () => ({
   store: storeFactory(false, store.getState())
});
const renderComponentToHTML = ({store}) =>
   ({
      state: store.getState(),
      html: renderToString(
         <Provider store={store}>
            <AppContainer />
         </Provider>
      )
   });
const buildHTMLPage = ({html = '', state}) =>
   `
      <!DOCTYPE html>
      <html>
        <head>
            <meta charset="utf-8"/>
            <title>Application counter</title>
            <style>${staticCss}</style>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>window.__INITIAL_STATE__ = ${ JSON.stringify(state) }</script>
            <script src="/bundle.js"></script>
        </body>
      </html>
   `;
const htmlResponse =
   compose(
      makeClientStoreFrom(serverStore),
      renderComponentToHTML,
      buildHTMLPage
   );
const respond = ({url}, res) => {
   res.status(200).send( htmlResponse(url) );
};
export default express()
   .use( bodyParser.json() )
   .use(logger)
   .use(fileAssets)
   .use(addStoreToRequestPipline)
   .use('/api', api)
   .use(respond)
