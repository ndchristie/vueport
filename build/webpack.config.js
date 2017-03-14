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
            scss: 'vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap',
          },
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap',
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
