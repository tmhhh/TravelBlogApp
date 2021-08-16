module.exports = function (app) {
  app.use("/", require("./site.route"));
  app.use("/Blogs", require("./blog.route"));
};
