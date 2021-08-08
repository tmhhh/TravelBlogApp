const mysql = require("mysql");
require("dotenv").config({ path: "./config/.env" });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
module.exports = {
  getAll: (table) => {
    return new Promise((resolve, reject) => {
      const query = connection.query(
        `Select * from ${table}`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  insert: (table, entity) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${table} SET ?`;
      connection.query(query, entity, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  },
  update: (table, entity, condition) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE ${table} SET ? WHERE ?`;
      connection.query(query, [entity, condition], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
  optionalUpdate: (query, condition) => {
    return new Promise((resolve, reject) => {
      connection.query(query, condition, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
  remove: (table, condition) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM ${table} where ?`;
      connection.query(query, condition, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
};
// module.exports = connection;
