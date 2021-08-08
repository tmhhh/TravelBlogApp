const { Router } = require("express");
const express = require("express");
const route = express.Router();
const blogController = require("../controllers/blog.controller");
route.get("/", (req, res) => {
  res.json("hello");
});
route.post("/Blogs/add", blogController.addBlog);
route.post("/Blogs/edit", blogController.editBlog);
route.post("/Blogs/delete", blogController.deleteBlog);
route.get("/Blogs/like", blogController.updateBlogLike);
route.get("/Blogs", blogController.getAllBlogs);
module.exports = route;
