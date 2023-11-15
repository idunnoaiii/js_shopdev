
const express = require('express')
const accessController = require('../../controllers/access.controller')
const { handleAsync } = require('../../auth/checkAuth')

const route = express.Router()

route.post("/shop/signup", handleAsync(accessController.signUp))
route.post("/shop/login", handleAsync(accessController.login))

module.exports = route
