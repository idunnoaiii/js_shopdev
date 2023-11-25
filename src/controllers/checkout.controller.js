const CheckoutSvc = require("../services/checkout.service")
const { SuccessResponse } = require("../core/success.response")


class CheckoutController {
    checkoutReview = async (req, res, next) => {
        return new SuccessResponse({
            metadata: CheckoutSvc.checkoutReview(req.body)
        }).send(res)
    }
}


module.exports = new CheckoutController()
