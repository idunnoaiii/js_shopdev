
const express = require('express')
const accessController = require('../../controllers/access.controller')
const handleAsync  = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const route = express.Router()

route.post("/shop/signup", handleAsync(accessController.signUp))
route.post("/shop/login", handleAsync(accessController.login))

route.use(authentication)

route.post("/shop/logout", handleAsync(accessController.logout))

module.exports = route
