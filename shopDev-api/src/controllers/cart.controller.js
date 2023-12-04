const { SuccessResponse } = require("../core/success.response")
const CartService = require("../services/cart.service")

class CartController {
    addToCart = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await CartService.addToCart(req.body)
        }).send(res)
    }

    update = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await CartService.addToCartV2(req.body)
        }).send(res)
    }

    delete = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await CartService.deleteUserCart(req.body)
        }).send(res)
    }

    getList = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await CartService.getListUserCart(req.query)
        }).send(res)
    }
}

module.exports = new CartController()