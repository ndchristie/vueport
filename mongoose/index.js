const mongoose = require('mongoose');

const databaseUrl = process.env.MONGODB_URL || 'mongodb://localhost/test';
const connect = () => mongoose.connect(databaseUrl).connection;
const db = connect()
  .on('error', console.log)
  .on('disconnected', connect);

module.exports = db;
