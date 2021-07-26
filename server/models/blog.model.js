const { getAll, insert } = require("../utils/db");
const table = "blog";
module.exports = {
  getAllBlogs: () => {
    return getAll(table);
  },
  addBlog: (blog) => {
    return insert(table, blog);
  },
};
