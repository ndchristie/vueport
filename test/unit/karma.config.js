const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('../../build/webpack.config');

const projectRoot = path.resolve(__dirname, '../../');

const webpackConfig = merge.smart(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'isparta-loader',
        include: path.resolve(projectRoot, 'src'),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader!isparta-loader',
            scss: 'vue-style-loader!css-loader?sourceMap!sass-loader',
          },
        },
      },
    ],
  },
});

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai-dom', 'sinon-stub-promise', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
  });
};
