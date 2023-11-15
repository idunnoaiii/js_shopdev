'use strict'

const keytokenModel = require("../models/keytoken.model")
const { Types } = require("mongoose")

class keyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {

            const filter = {
                user: userId
            }

            const update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }

            const option = {
                upsert: true,
                new: true
            }

            const token = await keytokenModel.findOneAndUpdate(filter, update, option)

            return token ? publicKey : null
        }
        catch (error) {
            console.log(error);
        }
    }


    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: new Types.ObjectId(userId) })
    }
    
    static removeById = async (keyId) => {
        return await keytokenModel.deleteOne({_id: keyId})
    }
}

module.exports = keyTokenService