const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')

const route = express.Router()

route.use(apiKey)
route.use(permission('0000'))

route.use("/v1/api/cart", require("./cart"))
route.use("/v1/api/checkout", require("./checkout"))
route.use("/v1/api/inventory", require("./inventory"))
route.use("/v1/api/discount", require("./discount"))
route.use("/v1/api/product", require("./product"))
route.use("/v1/api/notification", require("./notification"))
route.use("/v1/api", require("./access"))

module.exports = route
