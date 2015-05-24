var webpack = require('webpack');
var path = require('path');
var isDev = process.env.NODE_ENV || true;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModulesDir = path.join(__dirname, '/node_modules');

var config = {
  entry: {
    app: ['./app/app.js'],
    vendor: [ 'react' ]
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    isDev ? new ExtractTextPlugin('app.css', {allChunks: true}) : '',
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
  ],
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel?optional[]=runtime',
        exclude: [nodeModulesDir]
      },
      { test: /\.woff2$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.styl$/,
        loader: isDev ?
          'style!css!stylus?paths[]=node_modules/jeet/stylus/'
          : ExtractTextPlugin.extract('stylus', 'css-loader!stylus-loader')
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json', '.styl']
  }
};

module.exports = config;