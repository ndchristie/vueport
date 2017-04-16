// Polyfill fn.bind() and promise for PhantomJS
require('babel-polyfill');
require('isomorphic-fetch');
global.fetchMock = require('fetch-mock');
global._ = require('lodash');
const chaiAsPromised = require('chai-as-promised');

global.chai.use(chaiAsPromised);

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('@', true, /^\.\/(?!main(\.js)?$)/);
srcContext.keys().forEach(srcContext);
