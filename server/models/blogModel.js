const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  imageURL: String,
  title: String,
  description: String,
  blogcontent: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Registeruser' }
});

const Blogs = mongoose.model("Blogs", blogSchema);

module.exports = Blogs;