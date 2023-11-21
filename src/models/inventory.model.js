"use strict"


const { model, Schema, Types } = require("mongoose")

const DOCUMENT_NAME = "Inventory"
const COLLECTION_NAME = "Inventories"


const InventorySchema = new Schema({
    invent_productId: { type: Schema.Types.ObjectId, ref: "Product" },
    invent_location: { type: String, default: "unknown" },
    invent_stock: { type: Number, required: true },
    invent_shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
    // invent_shopId: {type: Schema.Types.ObjectId, ref: "Shop"}
    invent_reservations: { type: Array, default: [] },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


module.exports = model(DOCUMENT_NAME, InventorySchema)