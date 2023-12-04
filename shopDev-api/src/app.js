const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const compression = require("compression")
require('dotenv').config()

const config = require("./configs/config.mongodb.js")


const app = express()

app.use(morgan("dev"))
app.use(helmet())

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// init middleware
app.use("/", require("./routes"))
// init database
require('./dbs/init.mongodb.js')
const {  checkOverload } = require('./helpers/check.connect.js')
//checkOverload()

// handling error
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        errorDetail: config.app.isDev ? error.stack : "",
        message: error.message || "Internal Server Error" 
    })
})



module.exports = app
