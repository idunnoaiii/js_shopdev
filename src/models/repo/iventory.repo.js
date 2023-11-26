"use strict"

const { convertToObjectIdMongo } = require("../../utils")
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

const reservationInventory = async ({ productId, quantity, cartId }) => {
    const query = {
        invent_productId: convertToObjectIdMongo(productId),
        invent_stock: { $gte: quantity }
    }
    
    const updateSet = {
        $inc: {
            invent_stock: -quantity
        },
        $push: {
            invent_reservations: {
                quantity,
                cartId,
                createOn: new Date()
            }
        }
    }

    return await inventoryModel.updateOne(query, updateSet)
}

module.exports = {
    insertInventory,
    reservationInventory
}