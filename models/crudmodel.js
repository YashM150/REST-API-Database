const db = require('../config/db');

const AuthUser={

    findall:(callback)={
        return db.query('SELECT * FROM demo');
    },

}

module.exports = AuthUser;