const mysql = require('mysql');
require('dotenv').config();

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'groupomania-forum'
});

sql.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connection à la base de donnée réussie !');
});

module.exports = sql;