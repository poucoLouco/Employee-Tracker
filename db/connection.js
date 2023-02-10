const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "123741q",
    database: "Employee_tracker",
  },
  console.log(`Connected to the Employee_tracker database.`)
);
db.connect(function (err) {
  if (err) throw err;
});

module.exports = db;
