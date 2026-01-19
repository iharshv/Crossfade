const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,   // client or editor
  gender: String,
  dob: String
});

module.exports = mongoose.model("User", userSchema);
