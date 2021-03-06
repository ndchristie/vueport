const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// eslint-disable-next-line eqeqeq
if (process.env.NODE_ENV == undefined) process.env.NODE_ENV = 'development';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`,
      API_URI: `"${process.env.API_URI || '/api'}"`,
    },
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true,
  }),
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(new CompressionWebpackPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    sourceMap: true,
  }));
}

module.exports = plugins;
