const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const mapEnvVariables = (...keys) => keys
  .reduce((acc, key) => {
    const value = process.env[key];
    // eslint-disable-next-line eqeqeq
    acc[key] = !isNaN(parseFloat(value)) || value == undefined ? value : `"${value.toString()}"`;
    return acc;
  }, {});

const plugins = [
  new webpack.DefinePlugin({
    'process.env': mapEnvVariables('NODE_ENV', 'API_URI'),
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
