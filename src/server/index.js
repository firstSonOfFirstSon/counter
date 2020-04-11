import app from './app.js';
//import 'ignore-styles';

app.set('port', process.env.PORT || 8080);

app.listen(
   app.get('port'),
   () => console.log(`application running at 'http://localhost:${app.get('port')}'`)
);