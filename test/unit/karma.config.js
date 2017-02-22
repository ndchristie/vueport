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
            js: 'isparta-loader',
          },
        },
      },
    ],
  },
});

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
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
