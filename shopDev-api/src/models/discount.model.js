'use strict'

const { model, Schema, Types } = require("mongoose")

const DOCUMENT_NAME = "Discount"
const COLLECTION_NAME = "Discounts"


const DiscountSchema = new Schema({
    discount_name: { type: String, required: true },
    discount_description: { type: String, required: true },
    discount_type: { type: String, default: "fixed_amount" }, // precentage
    discount_value: { type: Number, required: true },
    discount_code: { type: String, required: true },
    discount_start_date: { type: Date, required: true },
    discount_end_date: { type: Date, required: true },
    discount_max_uses: { type: Number, required: true },// so luong discount duoc ap dung
    discount_uses_count: { type: Number, required: true }, //so discount da su dung
    discount_users_used: { type: Array, required: true }, // ai da su dung
    discount_max_uses_per_user: { type: Array, required: true },// so luong toi da moi user duoc su dung,
    discount_max_value: {type: Number, required: true},
    discount_min_order_value: { type: Number, required: true },
    discount_shopId: { type: Types.ObjectId, ref: "Shop" },
    discount_is_active: { type: Boolean, default: true },

    discount_applies_to: { type: String, required: true, enum: ["all", "specific"] },
    discount_product_ids: { type: Array, default: [] },// which product discount can apply for, in case above field is "all"
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


module.exports = model(DOCUMENT_NAME, DiscountSchema)
