const path = require('path');
const plugins = require('./plugins');
const styleLoaders = require('./styleLoaders');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

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
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: eslintFriendlyFormatter,
        },
      },
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
