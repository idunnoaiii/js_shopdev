"use strict"

const ProductService = require("../services/product.service")
const { Created, SuccessResponse } = require("../core/success.response")

class ProductController {

    createProduct = async (req, res, next) => {
        return new SuccessResponse({
            message: "create product successfully",
            metadata: await ProductService.createProduct(req.body.product_type, req.body)
        }).send(res)
    }

}


module.exports = new ProductController()
