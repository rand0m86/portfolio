var webpack = require('webpack');
var path = require('path');
var isDev = true;//process.env.NODE_ENV;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModulesDir = path.join(__dirname, '/node_modules');

var config = {
  entry: {
    app: ['./app/app.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    isDev ? new ExtractTextPlugin('app.css', {allChunks: true}) : '',
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      filename: null
    })
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js|\.jsx$/,
        loader: 'babel?optional[]=runtime',
        exclude: [nodeModulesDir]
      },
      {
        test: /\.styl$/,
        loader: isDev ?
          'style!css!stylus'
          : ExtractTextPlugin.extract('stylus', 'css-loader!stylus-loader')
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  }
};

module.exports = config;