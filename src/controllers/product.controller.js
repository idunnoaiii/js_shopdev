"use strict"

const ProductService = require("../services/product.service.v2")
const { Created, SuccessResponse, Ok } = require("../core/success.response")

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

    publisProductByShop = async (req, res, next) => {
        return new Ok({
            metadata: await ProductService.publishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    unPublisProductByShop = async (req, res, next) => {
        return new Ok({
            metadata: await ProductService.unPublishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId
            })
        }).send(res)
    }


    // QUERY
    getAllDraftsForShop = async (req, res, next) => {
        return new Ok({
            metadata: await ProductService.findAllDraftsForShop({
                product_shop: req.user.userId
            })
        }).send(res)
    }

    getAllPublishedByShop = async (req, res, next) => {
        return new Ok({
            metadata: await ProductService.findAllPublishedForShop({
                product_shop: req.user.userId
            })
        }).send(res)
    }
    

    getListSearchProduct = async (req, res, next) => {
        return new Ok({
            metadata: await ProductService.getListSearchProduct(req.params)
        }).send(res)
    }

    getAllProducts = async (req, res, next) => {
        return new Ok({
            metadata: await ProductService.findAllProducts(req.query)
        }).send(res)
    }

    getProduct = async (req, res, next) => {
        return new Ok({
            metadata: await ProductService.findProduct({
                product_id: req.params.product_id
            })
        }).send(res)
    }

    // END QUERY

}


module.exports = new ProductController()
