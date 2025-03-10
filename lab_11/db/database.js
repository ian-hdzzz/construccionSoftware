const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'videojuego',
    password: 'JU1Pz,98'
});

module.exports = pool.promise();