const path = require('path');
const plugins = require('./plugins');
const styleLoaders = require('./styleLoaders');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const config = {
  entry: {
    app: [
      'babel-polyfill',
      resolve('./src/main.js'),
    ],
  },
  output: {
    path: resolve('./dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: process.env.NODE_ENV === 'production' ? '#source-map' : '#eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            scss: styleLoaders.vueStyleLoaders,
          },
        },
      },
      {
        test: /\.css$/,
        loader: styleLoaders.cssStyleLoaders,
      },
      {
        test: /\.scss$/,
        loader: styleLoaders.scssStyleLoaders,
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.js', '.scss', '.vue'],
    alias: {
      '@': resolve('src'),
    },
  },
};

module.exports = config;
