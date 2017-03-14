const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

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
  devtool: '#inline-source-map',
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
            scss: 'vue-style-loader!css-loader?sourceMap!sass-loader',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
      models: path.resolve(__dirname, '../src/models'),
      store: path.resolve(__dirname, '../src/store'),
      router: path.resolve(__dirname, '../src/router'),
    },
  },
};

module.exports = config;
