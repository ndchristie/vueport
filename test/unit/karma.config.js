const path = require('path');
const webpackConfig = require('../../build/webpack.config');

const projectRoot = path.resolve(__dirname, '../../');

webpackConfig.module.rules.unshift({
  test: /\.(js|vue)$/,
  loader: 'istanbul-instrumenter-loader',
  include: path.resolve(projectRoot, 'src'),
});

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage-istanbul'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageIstanbulReporter: {
      dir: './test/unit/coverage',
      reports: ['html', 'lcov', 'text-summary'],
    },
  });
};
