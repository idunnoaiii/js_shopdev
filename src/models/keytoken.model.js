'use strict'

const { Schema, model, SchemaType } = require("mongoose")

const DOCUMENT_NAME = "Key"
const COLLECTION_NAME = "Keys"

var keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Shop"
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    refreshTokensUsed: {
        type: Array, default: []
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)