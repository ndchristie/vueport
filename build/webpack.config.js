const path = require('path');
const plugins = require('./plugins');
const styleLoaders = require('./styleLoaders');

const projectRoot = path.resolve(__dirname, '../');
const config = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(projectRoot, './src/main.js'),
    ],
  },
  output: {
    path: path.resolve(projectRoot, './dist'),
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
      src: path.resolve(projectRoot, './src'),
      assets: path.resolve(projectRoot, './src/assets'),
      components: path.resolve(projectRoot, './src/components'),
      models: path.resolve(projectRoot, './src/models'),
      store: path.resolve(projectRoot, './src/store'),
      router: path.resolve(projectRoot, './src/router'),
    },
  },
};

module.exports = config;
