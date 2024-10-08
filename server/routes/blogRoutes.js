const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");
const { 
  createBlog, 
  getBlogById, 
  getAllBlogs, 
  getUserBlogs, 
  deleteBlogById 
} = require("../controllers/blogController");

router.post("/createblog", middleware, createBlog);
router.get("/myblogs/:id", middleware, getBlogById);
router.get("/myblogs", middleware, getUserBlogs);
router.delete("/myblogs/:id", deleteBlogById);
router.get("/allblogs", getAllBlogs);
router.get("/allblogs/:id", getBlogById);

module.exports = router;
