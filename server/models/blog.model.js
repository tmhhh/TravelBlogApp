const {
  getAll,
  insert,
  update,
  remove,
  optionalUpdate,
} = require("../utils/db");
const table = "blog";
module.exports = {
  getAllBlogs: () => {
    return getAll(table);
  },
  addBlog: (blog) => {
    return insert(table, blog);
  },
  editBlog: (blog, blogID) => {
    const condition = {
      blogID,
    };
    delete blog.blogID;

    return update(table, blog, condition);
  },
  deleteBlog: (blogID) => {
    return remove(table, { blogID });
  },
  updateBlogLike: (blogID) => {
    const query = `UPDATE ${table} SET blogLike=blogLike+1 WHERE ?`;
    return optionalUpdate(query, { blogID });
  },
};
