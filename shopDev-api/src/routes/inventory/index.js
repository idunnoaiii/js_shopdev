
const express = require('express')
const inventoryController = require('../../controllers/inventory.controller')
const handleAsync = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const router = express.Router()

router.use(authentication)
router.post("/amount", handleAsync(inventoryController.addStockToInventory))


module.exports = router