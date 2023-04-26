require('dotenv').config()

const PORT = process.env.PORT || 1000
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_NAME = process.env.DB_NAME || 'database_links'
const DB_PORT = process.env.DB_PORT || 3306

exports.PORT = PORT
exports.DB_USER = DB_USER
exports.DB_PASSWORD = DB_PASSWORD
exports.DB_PORT = DB_PORT
exports.DB_NAME = DB_NAME
exports.DB_HOST = DB_HOST