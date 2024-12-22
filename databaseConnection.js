const mysql = require('mysql2')
require('dotenv').config()

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'srisync',
    port: 3306
})

const connect = () => {
    dbConnection.connect((err) => {
        if (err) {
            console.log('error', err.stack)
            return
        }
        else {
            console.log('Succesfully connected to database')
        }
    })
}

const dbConnection2 = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'srisync',
    port: 3306
})

const promiseDbConnection = dbConnection2.promise()

const connect2=async()=>{
    return await promiseDbConnection
}

module.exports= {connect, connect2}
