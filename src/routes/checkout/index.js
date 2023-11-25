

const express = require('express')
const checkoutController = require('../../controllers/checkout.controller')
const handleAsync  = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const router = express.Router()

router.post("/review", handleAsync(checkoutController.checkoutReview))



module.exports = router