const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,         // Ensure this is correct
  user: process.env.DB_USER,              // Use your MySQL username
  password: process.env.DB_PASSWORD,              // Use your MySQL password
  database: process.env.DB_NAME, // Replace with your database name
  port: process.env.DB_port,                // Ensure this is set to the correct port (default is 3306)
});


// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database' );
});

module.exports = connection;
