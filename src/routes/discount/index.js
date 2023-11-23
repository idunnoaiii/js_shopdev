
const express = require('express')
const discountController = require('../../controllers/discount.controller')
const handleAsync  = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const router = express.Router()

router.post("/amount", handleAsync(discountController.getDiscountAmount))
router.get("/list-product-codes", handleAsync(discountController.getAllDiscountCodesWithProduct))

router.use(authentication)

router.post("/", handleAsync(discountController.createDiscountCode))
router.get("/", handleAsync(discountController.getAllDiscountCodes))


module.exports = router
