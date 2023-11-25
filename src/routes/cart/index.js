
const express = require('express')
const cartController = require('../../controllers/cart.controller')
const handleAsync  = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const router = express.Router()


router.post("/",handleAsync(cartController.addToCart))
router.delete("/", handleAsync(cartController.delete))
router.post("/update", handleAsync(cartController.update))
router.get("/", handleAsync(cartController.getList))

module.exports = router
