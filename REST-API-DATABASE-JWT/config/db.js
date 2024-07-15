const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',      // Your database host
    user: 'root',           // Your database user
    password: 'Matthe@123#',   // Your database password
    database: 'APIM'  // Your database name
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
