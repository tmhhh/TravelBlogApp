const express = require("express");
const route = express.Router();
const { userLogin, userRegister } = require("../controllers/authen.controller");
route.get("/", (req, res) => {
  res.json("hello");
});
route.post("/login", userLogin);
route.post("/register", userRegister);

module.exports = route;
