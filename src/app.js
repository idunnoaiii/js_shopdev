const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const compression = require("compression")
require('dotenv').config()


const app = express()

app.use(morgan("dev"))
app.use(helmet())

app.use(compression())
// init middleware
app.use("/", require("./routes"))
// init database
require('./dbs/init.mongodb.js')
const {  checkOverload } = require('./helpers/check.connect.js')
checkOverload()
// handling router 

// handling error



module.exports = app
