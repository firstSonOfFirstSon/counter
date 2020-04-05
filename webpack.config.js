const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
   mode: NODE_ENV,
   entry: './index.js',
   context: __dirname + '/src',
   output: {
      path: __dirname + '/dist/assets',
      filename: 'bundle.js'
   }
};