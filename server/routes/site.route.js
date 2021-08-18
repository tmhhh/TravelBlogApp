const express = require("express");
const route = express.Router();
const {
  userLogin,
  userRegister,
  verifyUser,
} = require("../controllers/authen.controller");
route.get("/", (req, res) => {
  res.json("hello");
});
route.post("/login", userLogin);
route.post("/register", userRegister);
route.get("/verifyUser", verifyUser);
module.exports = route;
