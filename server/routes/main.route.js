const { Router } = require("express");
const express = require("express");
const route = express.Router();
const blogController = require("../controllers/blog.controller");
route.get("/", (req, res) => {
  res.json("hello");
});
route.post("/Blogs", blogController.addBlog);
route.get("/Blogs", blogController.getAllBlogs);
module.exports = route;
