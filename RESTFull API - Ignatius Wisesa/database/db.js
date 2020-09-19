const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
 host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	multipleStatements: true
})

// const db = mysql.createConnection('mysql://bc48aa5983f293:2f8183ec@us-cdbr-east-02.cleardb.com/heroku_f9321529f91f8b5?reconnect=true');

module.exports = db;