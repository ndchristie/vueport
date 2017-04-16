const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost/test';
const connect = () => mongoose.connect(databaseUrl).connection;
const db = connect()
  .on('error', console.log)
  .on('disconnected', connect);

module.exports = db;
