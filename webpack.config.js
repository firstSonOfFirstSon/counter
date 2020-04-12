const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
         }, {
         /*
         ignore-loade решил проблему с игнором scss в серверной сборке
         *  */
            test: /\.scss$/,
            use: ['ignore-loader']
         }
      ]
   },
   plugins: [
      new webpack.DefinePlugin({
         DIR_STATIC_FILES: JSON.stringify( path.join(__dirname, '/dist/assets') ),
         DIR_INITIAL_STATE: JSON.stringify( path.join(__dirname, '/data/initialState.json') )
      }),
      /*
       IgnorePlugin предотвращает генерацию модулей для import или require вызовов (на этапе сборки),
       т. е. в bundle эти модули не попадают. След-но,
       при запуске серверного bundle, будет ошибка, что модули /\.scss$/ не найдены.
      */
     // new webpack.IgnorePlugin({resourceRegExp: /\.scss$/})
   ]
  // externals: /\.scss$/
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
   devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : 'none',
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ['@babel/preset-env', "@babel/preset-react"]//"@babel/preset-stage-0"
               }
            }
         }, {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', {
               loader: "postcss-loader",
               options: {
                  plugins: () => [require("autoprefixer")]
               }
            }, 'sass-loader']
         }
      ]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'bundle.css',
         chunkFilename: '[id].css',
      })
   ]
};

module.exports = [clientConfig, serverConfig];