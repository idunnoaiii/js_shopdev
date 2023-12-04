"use strict"


const { model, Schema, Types } = require("mongoose")

const DOCUMENT_NAME = "Order"
const COLLECTION_NAME = "Orders"

const OrderSchema = new Schema({
    order_userId: { type: Number, required: true },
    order_checkout: {
        type: Object, default: {
            /*
                {
                    totalPrice,
                    totalApplyDiscount,
                    feeShip
                }
            */
        }
    },
    order_shipping: {
        type: Object, default: {
            /*
                {
                    street,
                    city,
                    state,
                    country
                }
            */
        }
    },
    order_payment: {
        type: Object,
        default: {}
    },
    order_products: {
        type: Array,
        required: true
    },
    order_trackingNumber: {
        type: String,
        default: "#000000000000000"
    },
    order_status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "cancelled", "delivered"],
        default: "pending"
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


module.exports = model(DOCUMENT_NAME, OrderSchema)