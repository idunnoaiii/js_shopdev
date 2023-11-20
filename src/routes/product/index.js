
const express = require('express')
const productController = require('../../controllers/product.controller')
const handleAsync  = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const route = express.Router()


route.use(authentication)

route.post("", handleAsync(productController.createProduct))
route.get("/drafts/all", handleAsync(productController.getAllDraftsForShop))

module.exports = route

