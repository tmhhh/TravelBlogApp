const db = require("../utils/db");
const table = "user";
module.exports = {
  checkUsername: (username) => {
    return db.getWithCondition(table, { username });
  },
  userRegister: (user) => {
    return db.insert(table, user);
  },
  checkUserID: (userID) => {
    return db.getWithCondition(table, { userID });
  },
};
