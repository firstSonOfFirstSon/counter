import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import storeFactory from '../store';
import initialState from '../../data/initialState.json';
import App from '../components/App';

const store = storeFactory(true, initialState);
const fileAssets = express.static( DIR_STATIC_FILES );
const logger = (req, res, next) => {
   console.log(`${req.method} request for '${req.url}'`);
   next();
};
const compose = (...fns) => arg =>
      fns.reduce( (prevRes, fn) => fn(prevRes), arg);
const renderComponentToHtml = (url) =>
   ({
      html: 'there will be a super application'
   });
const buildHTMLPage = ({html = '', css = ''}) =>
   `
      <!DOCTYPE html>
      <html>
        <head>
            <meta charset="utf-8"/>
            <title>Application counter</title>
            <link rel="stylesheet" href="./bundle.css">
        </head>
        <body>
            <div id="root">${html}</div>
            <script src="/bundle.js"></script>
        </body>
      </html>
   `;
const htmlResponse =
   compose(
      renderComponentToHtml,
      buildHTMLPage
   );
const respond = ({url}, res) => {
   res.status(200).send( htmlResponse(url) );
};
export default express()
   .use( bodyParser.json() )
   .use(logger)
   .use(fileAssets)
   .use(respond)
