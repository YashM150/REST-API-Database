const db = require('../config/db');

const AuthUser={
    findAll: (callback) => {
        return db.query('SELECT * FROM login', (err, results) => {
            if (err) {
              console.error('Error while finding users:', err);
              return callback(err, null);
            }
            return callback(null, results);
          });
      },
    findUser:(username,callback)=>{
        return db.query('SELECT * FROM demo WHERE ID = ?', [username], (err, results) => {
            if (err) {
              console.error('Error while finding user id:', err);
              return callback(err, null);
            }
            return callback(null, results);
          });
       
    },
    deleteUser: (username,callback) => {
        console.log(username);
        return db.query('DELETE FROM login where username=?', [username], (err, result) => {
            if (err) {
              console.error('Error during user creation:', err);
              return callback(err, null);
            }
            return callback(null,result);
          })
    },
    AddUser:(user,callback)=>{
        console.log(user[0]);
       
        return db.query('INSERT INTO demo(name,gender,bloodgroup,username) VALUES (?,?,?,?)',user, (err, result) => {
            if (err) {
              console.error('Error during user creation:', err);
              return callback(err, null);
            }
            return callback(null, result);
          })
    },
    UpdatePartiall:(id, fields, callback)=>{
        const setClause = Object.keys(fields).map(key => `${key} = ?`).join(', ');
        const values = Object.values(fields);
        values.push(id);
        const sql = `UPDATE demo SET ${setClause} WHERE ID = ?`;

        return db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return callback(err, null);
        }
        return callback(null, result);
        });
    }

}

module.exports = AuthUser;