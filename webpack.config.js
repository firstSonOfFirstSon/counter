const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const serverConfig = {
   target: 'node',
   mode: NODE_ENV,
   entry: './server/index.js',
   context: path.resolve(__dirname, 'src'),
   output: {
      path: __dirname + '/dist/assets',
      filename: 'bundle.node.js'
   },
   watch: NODE_ENV === 'development',
   watchOptions: {
      ignored: /node_modules/
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ['@babel/preset-env', "@babel/preset-react"]
               }
            }
         }
      ]
   },
   plugins: [
      new webpack.DefinePlugin({
         DIR_STATIC_FILES: JSON.stringify( path.join(__dirname, '/dist/assets') )
      })
   ]

};
const clientConfig = {
   target: 'web',
   mode: NODE_ENV,
   entry: './index.js',
   context: __dirname + '/src',
   output: {
      path: __dirname + '/dist/assets',
      filename: 'bundle.js'
   },
   watch: NODE_ENV === 'development',
   watchOptions: {
      ignored: /node_modules/
   },
};



module.exports = [clientConfig, serverConfig];