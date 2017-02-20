const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

Object.keys(webpackConfig.entry).forEach((name) => {
  webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name]);
});

const compiler = webpack(webpackConfig);
const port = 3000;

const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
});

const hotMiddleware = webpackHotMiddleware(compiler);

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

const app = express();
app.use(devMiddleware);
app.use(hotMiddleware);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

/* eslint-disable no-console */
module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Dev server started at http://localhost:${port}\n`);
});
/* eslint-enable no-console */
