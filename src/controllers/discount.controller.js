const DiscountService = require("../services/discount.service")
const { Ok, SuccessResponse } = require("../core/success.response")

class DiscountController {

    createDiscountCode = async (req, res, next) => {
        return new SuccessResponse({
            metadata: DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getAllDiscountCodes = async (req, res, next) => {
        return new SuccessResponse({
            metadata: DiscountService.getAllDiscountCodesOfShop({
                ...req.query,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getDiscountAmount = async (req, res, next) => {
        return new SuccessResponse({
            metadata: DiscountService.getDiscountAmount({
                ...req.body,
            })
        }).send(res)
    }
    
    getAllDiscountCodesWithProduct = async (req, res, next) => {
        return new SuccessResponse({
            metadata: DiscountService.getAllDiscountCodesWithProduct({
                ...req.query
            })
        }).send(res)
    }
    
    


}


module.exports = new DiscountController()