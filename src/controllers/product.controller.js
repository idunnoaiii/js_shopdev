"use strict"

const ProductService = require("../services/product.service.v2")
const { Created, SuccessResponse } = require("../core/success.response")

class ProductController {

    createProduct = async (req, res, next) => {
        return new SuccessResponse({
            message: "create product successfully",
            metadata: await ProductService.createProduct(req.body.product_type,
                {
                    ...req.body,
                    product_shop: req.user.userId
                })
        }).send(res)
    }

}


module.exports = new ProductController()
