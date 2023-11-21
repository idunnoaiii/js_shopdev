"use strict"

const inventoryModel = require("../inventory.model")
const { Types } = require("mongoose")

const insertInventory = async ({ productId, shopId, stock, location = "unknow" }) => {
    return await inventoryModel.create({
        invent_productId: productId,
        invent_shopId: shopId,
        invent_location: location,
        invent_stock: stock
    })
}


module.exports = {
    insertInventory
}