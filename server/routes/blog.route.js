const { Router } = require("express");
const express = require("express");
const route = express.Router();
const blogController = require("../controllers/blog.controller");

route.post("/add", blogController.addBlog);
route.put("/edit", blogController.editBlog);
route.delete("/delete", blogController.deleteBlog);
route.put("/like", blogController.updateBlogLike);
route.get("/search", blogController.searchBlog);
route.get("/", blogController.getAllBlogs);
module.exports = route;
