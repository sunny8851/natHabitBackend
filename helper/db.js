const mysql = require("mysql2");
require("dotenv").config();
// MySQL Connection Configuration
const db = mysql.createConnection({
  host: process.env.host,
  port: process.env.DATABSE_PORT,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Export the connection object
module.exports = db;
