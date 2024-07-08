const db = require('../config/db');

const AuthUser={
    findAll: (callback) => {
        return db.query('SELECT * FROM login', callback);
      }
}

module.exports = AuthUser;