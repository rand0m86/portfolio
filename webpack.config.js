var webpack = require('webpack');
var path = require('path');
var isDev = true;//process.env.NODE_ENV;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModulesDir = path.join(__dirname, '/node_modules');

var config = {
  // addVendor: function (name, path) {
  //   this.resolve.alias[name] = path;
  //   this.module.noParse.push(new RegExp('^' + name + '$'));
  // },
  entry: {
    app: ['./app/main.js']/*,
    vendor: ['react']*/
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    isDev ? new ExtractTextPlugin('app.css', {allChunks: true}) : ''/*,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: 10000
    })*/
  ],
  output: {
    publicPath: '/',
    path: __dirname, // TODO
    // path: process.env.NODE_ENV === 'production' ? './dist' : './build',
    filename: 'bundle.js'
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?optional[]=runtime',
        exclude: [nodeModulesDir]
      },
      {
        test: /\.jsx$/,
        loader: 'babel?optional[]=runtime',
        // loaders: ['react-hot', 'babel?optional[]=runtime'],
        exclude: [nodeModulesDir]
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      // {
      //   test: /\.scss$/,
      //   loader: 'style!css!sass?'includePaths[]=' + path.resolve(__dirname, './node_modules/jeet/scss')
      // },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.styl$/,
        loader: isDev ?
          'style!css!stylus'
          : ExtractTextPlugin.extract('stylus', 'css-loader!stylus-loader')
        //ExtractTextPlugin.extract('style', 'css!stylus')
      }
      // { test: /\.css$/, loader: 'style!css' }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  }
};

// config.addVendor('react', bowerDir + '/react/react.min.js');
// config.addVendor('bootstrap', bowerDir + '/bootstrap/dist/js/bootstrap.min.js');
// config.addVendor('bootstrap.css', bowerDir + '/bootstrap/dist/css/bootstrap.min.css');

module.exports = config;