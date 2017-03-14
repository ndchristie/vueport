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
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
          // other vue-loader options go here
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
    // new webpack.ProvidePlugin({
    //   Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
    //   fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    // }),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      models: path.resolve(__dirname, '../src/models'),
      store: path.resolve(__dirname, '../src/store'),
      router: path.resolve(__dirname, '../src/router'),
    },
  },
};

module.exports = config;
