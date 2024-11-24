
// const db = require('../config/dbConfig'); // Import database connection

exports.getUsers = (callback) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// exports.createUser = (name, email, callback) => {
//   db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
//     if (err) return callback(err, null);
//     callback(null, { id: results.insertId, name, email });
//   });
// };
