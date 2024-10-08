const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Registeruser = mongoose.model("Registeruser", userSchema);

module.exports = Registeruser;