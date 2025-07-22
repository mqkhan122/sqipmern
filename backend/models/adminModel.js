// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//   email: String,
//   password: String // hashed password
// });

// module.exports = mongoose.model('Admin', adminSchema);

// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);

