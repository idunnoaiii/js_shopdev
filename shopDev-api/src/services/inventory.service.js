const inventoryModel = require("../models/inventory.model")

const { getProductById } = require("../models/repo/product.repo")

const { BadRequestError } = require("../core/error.response")

class InventoryService {
    static async addStockToInventory({
        stock,
        productId,
        shopId,
        location = "123, tran phu, Tp HCM"
    }) {
        const product = await getProductById(productId)
        if (!product) {
            throw new BadRequestError("The product does not exists")
        }

        const query = { invent_shopId: shopId, invent_productId: productId }

        const updateSet = {
            $inc: {
                invent_stock: stock
            },
            $set: {
                invent_location: location
            }
        }

        return await inventoryModel.findOneAndUpdate(query, updateSet, {
            upsert: true, 
            new: true
        })
    }
}


module.exports = InventoryService