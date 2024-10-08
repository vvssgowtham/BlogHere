const Blogs = require("../models/blogModel");

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { imageURL, title, description, blogcontent } = req.body;
    const userId = req.user.id;

    const blog = new Blogs({
      imageURL,
      title,
      description,
      blogcontent,
      user: userId,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.error('Error saving blog to the database:', error);
    res.status(400).json({ error: 'Blog creation failed. Database error.' });
  }
};

// Get a specific blog by ID
const getBlogById = async (req, res) => {
  const blog = await Blogs.findById(req.params.id);
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  return res.json(blog);
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    return res.json(blogs);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error" + err);
  }
};

// Get all blogs by user
const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({ user: req.user.id });
    return res.json(blogs);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error" + err);
  }
};

// Delete a blog
const deleteBlogById = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    await Blogs.deleteOne({ _id: req.params.id });
    return res.status(200).send("Blog deleted successfully");
  } catch (err) {
    res.status(500).send("Server error" + err);
  }
};

module.exports = {
  createBlog,
  getBlogById,
  getAllBlogs,
  getUserBlogs,
  deleteBlogById
};