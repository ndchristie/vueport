require('dotenv').config();
const express = require('express');
const path = require('path');

const projectRoot = path.resolve(__dirname, '../');
const port = process.env.PORT || 8080;
const staticPath = process.env.STATIC_PATH || path.resolve(projectRoot, './dist');

const app = express();
app.use(express.static(staticPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
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
