'use strict'

const { Schema, model, SchemaType } = require("mongoose")

const DOCUMENT_NAME = "Notification"
const COLLECTION_NAME = "Notifications"

var notificationSchema = new Schema({
    noti_type: { type: String, enum: ["ORDER-001", "ORDER-001", "PROMOTION-001", "SHOP-001"], required: true },
    noti_senderId: { type: Schema.Types.ObjectId, required: true, ref: "Shop" },
    noti_receivedId: { type: Number, required: true },
    noti_content: { type: String, required: true },
    noti_options: { type: Object, default: {} }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = model(DOCUMENT_NAME, notificationSchema)