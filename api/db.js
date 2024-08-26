const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Nitin147",
  database: "blog",
});

console.log("Connected to database");

module.exports = db;
