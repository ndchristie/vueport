const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  href: String,
});

module.exports = mongoose.model('SocialLink', schema);
