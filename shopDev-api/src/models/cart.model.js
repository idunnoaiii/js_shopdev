
'use strict'

const { model, Schema, Types } = require("mongoose")

const DOCUMENT_NAME = "Cart"
const COLLECTION_NAME = "Carts"


const CartSchema = new Schema({
    cart_state: { type: String, required: true, enum: ["active", "completed", "failded", "pending"], default: "active" },
    cart_products: { type: Array, required: true, default: [] },
    /*
      [
      {
            productId:
            shopId:
            quantity:
            name:
            price:
      }
      ]
     */
    cart_count_product: { type: Number, default: 0 },
    cart_userId: { type: Number, required: true }

}, {
    timestamps: {
        createdAt: "createdOn",
        updatedAt: "modifiedOn"
    },
    collection: COLLECTION_NAME
})


module.exports = model(DOCUMENT_NAME, CartSchema)
