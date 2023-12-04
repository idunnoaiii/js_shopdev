const DiscountService = require("../services/discount.service")
const { Ok, SuccessResponse } = require("../core/success.response")

class DiscountController {

    createDiscountCode = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getAllDiscountCodeOfShop = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await DiscountService.getAllDiscountCodesOfShop({
                ...req.query,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getDiscountAmount = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await DiscountService.getDiscountAmount({
                ...req.body,
            })
        }).send(res)
    }

    getAllProductsForDiscountCode = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await DiscountService.getAllProductsForDiscountCode({
                ...req.query
            })
        }).send(res)
    }


}


module.exports = new DiscountController()