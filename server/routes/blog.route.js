const { Router } = require("express");
const express = require("express");
const route = express.Router();
const blogController = require("../controllers/blog.controller");

route.post("/add", blogController.addBlog);
route.post("/edit", blogController.editBlog);
route.post("/delete", blogController.deleteBlog);
route.get("/like", blogController.updateBlogLike);
route.get("/search", blogController.searchBlog);
route.get("/", blogController.getAllBlogs);
module.exports = route;
