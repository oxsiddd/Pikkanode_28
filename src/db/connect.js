const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    connectionLimit: 2,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pikkanode'
})

module.exports = pool