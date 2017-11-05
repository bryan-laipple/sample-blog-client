const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('./env.json');

const devServerPort = 8080;

module.exports = {
  devtool: 'eval',
  entry: [
    `webpack-dev-server/client?http://localhost:${devServerPort}`,
    'webpack/hot/only-dev-server',
    './src/index.js',
    './style/style.css'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      favicon: 'image/favicon.ico',
      template: 'index.template.ejs',
      inject: 'body',
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
  },
  devServer: {
    port: devServerPort,
    historyApiFallback: true,
    contentBase: './'
  }
};
