
const express = require('express')
const notificationController = require('../../controllers/notification.controller')
const handleAsync  = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const router = express.Router()


router.use(authentication)

router.get("/", handleAsync(notificationController.listNotiByUser))


module.exports = router
