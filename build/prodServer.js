require('dotenv').config();
const path = require('path');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const db = require('../mongoose');
const apiRouter = require('../router');

const projectRoot = path.resolve(__dirname, '../');
const port = process.env.PORT || 8080;
const staticPath = process.env.STATIC_PATH || path.resolve(projectRoot, './dist');

db.once('open', () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRouter);
  app.use(history());
  app.use((req, res, next) => {
    req.db = db;
    next();
  });
  app.use(expressStaticGzip(staticPath));

  module.exports = app.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server started using port ${port}\n`);
  });
});
