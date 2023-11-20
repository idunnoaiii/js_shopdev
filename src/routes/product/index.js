
const express = require('express')
const productController = require('../../controllers/product.controller')
const handleAsync  = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const route = express.Router()

route.get("/search/:keySearch", handleAsync(productController.getListSearchProduct))
route.get("", handleAsync(productController.getAllProducts))
route.get("/:product_id", handleAsync(productController.getProduct))

route.use(authentication)

route.post("", handleAsync(productController.createProduct))
route.post("/publish/:id", handleAsync(productController.publisProductByShop))
route.post("/unpublish/:id", handleAsync(productController.unPublisProductByShop))


// query
route.get("/drafts/all", handleAsync(productController.getAllDraftsForShop))
route.get("/published/all", handleAsync(productController.getAllPublishedByShop))

module.exports = route

