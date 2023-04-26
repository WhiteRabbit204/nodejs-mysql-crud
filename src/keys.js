const {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} = require("./config.js")


console.log(DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER)

module.exports = {
    database: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }

};