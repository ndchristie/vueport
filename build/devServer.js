require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const db = require('../mongoose');
const apiRouter = require('../router');

Object.keys(webpackConfig.entry).forEach((name) => {
  webpackConfig.entry[name] = ['./build/devClient'].concat(webpackConfig.entry[name]);
});

const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
  },
});

const hotMiddleware = webpackHotMiddleware(compiler);

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

const port = process.env.PORT || 8080;

db.once('open', () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRouter);
  app.use(history());
  app.use(devMiddleware);
  app.use(hotMiddleware);
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  module.exports = app.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Dev server started at http://localhost:${port}\n`);
  });
});
