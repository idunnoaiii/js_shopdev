
const express = require('express')
const accessController = require('../../controllers/access.controller')
const { handleAsync } = require('../../auth/checkAuth')

const route = express.Router()

route.post("/shop/signup", handleAsync(accessController.signUp))

module.exports = route
