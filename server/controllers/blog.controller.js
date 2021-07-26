const blogModel = require("../models/blog.model");
const cloudinaryMdw = require("../middlewares/cloudinary.mdw");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
module.exports = {
  getAllBlogs: async (req, res, next) => {
    console.log("ctl");
    try {
      const blogs = await blogModel.getAllBlogs();
      console.log(blogs);
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
        console.log("1");
        const Blog = {
          blogContent: req.body.content,
          blogTitle: req.body.title,
          blogImage: cloudRes.url,
        };
        console.log(Blog);
        const result = await blogModel.addBlog(Blog);
        if (Object.keys(result).length > 0)
          res.status(200).json("Uploaded successfully");
        else res.status(500).json("Error");
      } else res.status(500).json("Error");
    } catch (err) {
      console.log(err);
    }
  },
};
