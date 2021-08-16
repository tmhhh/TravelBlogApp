const authenModel = require("../models/authen.model");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  userLogin: async (req, res) => {
    try {
      const username = req.body.username;
      const user = await authenModel.checkUsername(username);
      if (!user[0])
        return res.status(400).json({
          isSuccess: false,
          error: "Username or password is not valid",
        });
      const checkPass = await bcrypt.compare(
        req.body.password.toString(),
        user[0].userPassword
      );
      if (!checkPass)
        return res.status(400).json({
          isSuccess: false,
          error: "Username or password is not valid",
        });
      delete user.userPassword;
      return res.status(200).json({
        isSuccess: true,
        userToken: jwt.sign(user[0].userID, process.env.TOKEN_SECRET_KEY),
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error: "Server error" });
    }
  },
  userRegister: async (req, res) => {
    const username = req.body.username;
    try {
      const check = await authenModel.checkUsername(username);
      if (check[0])
        return res
          .status(400)
          .json({ isSuccess: false, error: "Username already exists" });
      const registedUserID = uuidv4();
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const userHashPassword = await bcrypt.hash(req.body.password, saltRounds);
      const User = {
        userID: registedUserID,
        userName: req.body.username,
        userPassword: userHashPassword,
      };
      const result = await authenModel.userRegister(User);
      if (result.affectedRows > 0)
        return res.status(200).json({
          isSuccess: true,
          userToken: jwt.sign(registedUserID, process.env.TOKEN_SECRET_KEY),
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error: "Server error" });
    }
  },
};
