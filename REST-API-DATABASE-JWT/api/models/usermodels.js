const db = require('../../config/db');

const User = {
  findByUsername: (username, callback) => {
    return db.query('SELECT * FROM login WHERE username = ?', [username], callback);
  },
  create: (user, callback) => {
    return db.query('INSERT INTO login SET ?', user, (err, result) => {
      if (err) {
        console.error('Error during user creation:', err);
        return callback(err, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = User;
