"use strict"

const { Schema, model, SchemaType } = require("mongoose")
const { schema } = require("./shop.model")

const slugify = require("slugify")

const DOCUMENT_NAME = "Product"
const COLLECTION_NAME = "Products"


const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_desciption: String,
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ["Electronic", "Clothing", "Furniture"] },
    product_attribute: { type: Schema.Types.Mixed, requried: true },
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" },
    //more
    product_ratingAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"],
        set: (val) => Math.round(val * 10) / 10
    },
    product_variations: {
        type: Array, default: []
    },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false }
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
})

// Document middleware: runs before .save() and .create()
productSchema.pre("save", function (next) {
    this.product_slug = slugify(this.product_name, { lower: true })
    next()
})

const clothingSchema = new Schema({
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" }
}, {
    collection: "Clothes",
    timeseries: true
})

const electronicSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" }
}, {
    collection: "Electronic",
    timeseries: true
})


const furnitureSchema = new Schema({
    brand: { type: String, require: true },
    size: Number,
    meterial: String,
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" }
})

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model("Clothing", clothingSchema),
    electronic: model("Electronic", electronicSchema),
    furniture: model("Furniture", furnitureSchema)
}