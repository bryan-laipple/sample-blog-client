const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('./env.json');

module.exports = {
  entry: {
    main: ['./src/index.js', './style/style.css']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles.[chunkhash].bundle.css'),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      favicon: 'image/favicon.ico',
      template: 'index.template.ejs',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        keepClosingSlash: true
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel'
    }, {
      test: /\.css$/,
      include: path.join(__dirname, 'style'),
      loader: ExtractTextPlugin.extract('css')
    }]
  }
};
