"use strict"

const { Schema, model, SchemaType } = require("mongoose")
const { schema } = require("./shop.model")

const DOCUMENT_NAME = "Product"
const COLLECTION_NAME = "Products"

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_desciption: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ["Electronic", "Clothing", "Furniture"] },
    product_attribute: { type: Schema.Types.Mixed, requried: true },
    product_shop: {type: Schema.Types.ObjectId, ref: "Shop"}
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})


const clothingSchema = new Schema({
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: {type: Schema.Types.ObjectId, ref: "Shop"}
}, {
    collection: "Clothes",
    timeseries: true
})

const electronicSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    product_shop: {type: Schema.Types.ObjectId, ref: "Shop"}
}, {
    collection: "Electronic",
    timeseries: true
})

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model("Clothing", clothingSchema),
    electronic: model("Electronic", electronicSchema)
}