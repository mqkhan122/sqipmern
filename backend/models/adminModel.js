const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: String,
  password: String // hashed password
});

module.exports = mongoose.model('Admin', adminSchema);
