'use strict'

const keytokenModel = require("../models/keytoken.model")

class keyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const token = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            
            return token
        }
        catch (error) {

        }
    }
}

module.exports = keyTokenService