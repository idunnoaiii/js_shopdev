'use strict'

const { model, Schema, Types } = require("mongoose")

const DOCUMENT_NAME = "ApiKey"
const COLLECTION_NAME = "ApiKeys"


const ApiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permissions: {
        type: [String],
        required: true,
        enum: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


module.exports = model(DOCUMENT_NAME, ApiKeySchema)