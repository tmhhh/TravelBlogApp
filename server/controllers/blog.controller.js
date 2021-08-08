const blogModel = require("../models/blog.model");
const cloudinaryMdw = require("../middlewares/cloudinary.mdw");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
module.exports = {
  getAllBlogs: async (req, res, next) => {
    console.log("ctl");
    try {
      const blogs = await blogModel.getAllBlogs();
      // console.log(blogs);
      res.status(200).json(blogs);
    } catch (err) {
      console.log(err);
      next();
    }
  },
  addBlog: async (req, res, next) => {
    try {
      const imageName = req.files.picture.name.split(".");
      const imageExt = imageName[imageName.length - 1];

      const blogImage = await parser.format(imageExt, req.files.picture.data)
        .content;

      const cloudRes = await cloudinaryMdw.uploadImage(blogImage);
      if (Object.keys(cloudRes).length > 0) {
        const Blog = {
          blogID: req.body.id,
          blogContent: req.body.content,
          blogTitle: req.body.title,
          blogImage: cloudRes.url,
        };
        const result = await blogModel.addBlog(Blog);
        // console.log(result);
        if (result.affectedRows > 0)
          res.status(200).json({ isSuccess: true, newBlog: Blog });
        else res.status(500).json("Error");
      } else res.status(500).json("Error");
    } catch (err) {
      console.log("catch");
      console.log(err);
    }
  },
  editBlog: async (req, res) => {
    try {
      const Blog = {
        blogID: req.body.id,
        blogContent: req.body.content,
        blogTitle: req.body.title,
      };
      var blogImage = "";
      if (req.files) {
        const imageName = req.files.picture.name.split(".");
        const imageExt = imageName[imageName.length - 1];
        blogImage = await parser.format(imageExt, req.files.picture.data)
          .content;
        const cloudRes = await cloudinaryMdw.uploadImage(blogImage);
        if (Object.keys(cloudRes).length > 0) {
          blogImage = cloudRes.url;
        } else return res.status(500).json("Server error");
      }
      if (blogImage !== "") {
        Blog.blogImage = blogImage;
        const check = await blogModel.editBlog(Blog, req.body.id);
        if (check.affectedRows <= 0) {
          console.log("no");
          return res.status(500).json("Error");
        } else {
          console.log("yes");
          return res.status(200).json({ isSuccess: true, newBlog: Blog });
        }
      } else {
        const check = await blogModel.editBlog(Blog, req.body.id);
        if (check.affectedRows <= 0) {
          console.log("no");
          return res.status(500).json("Error");
        } else {
          console.log("yes");
          return res.status(200).json({ isSuccess: true, newBlog: Blog });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteBlog: async (req, res) => {
    if (!req.body.id) return res.status(400).json({ isSuccess: false });
    try {
      console.log(req.body.id);
      const blogID = req.body.id;
      const check = await blogModel.deleteBlog(blogID);
      if (check.affectedRows <= 0)
        return res.status(500).json({ isSuccess: false });
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      console.log(error);
    }
  },
  updateBlogLike: async (req, res) => {
    if (!req.query.id) return res.status(400).json({ isSuccess: false });
    try {
      const blogID = req.query.id;
      const check = blogModel.updateBlogLike(blogID);
      if (check.affectedRows <= 0)
        return res.status(500).json({ isSuccess: false });
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      console.log(error);
    }
  },
};
