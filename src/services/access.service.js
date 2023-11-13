const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const keyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../utils")


const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN"
}

class AccessService {
    static signUp = async ({ name, email, password }) => {

        try {
            const holderShop = await shopModel.findOne({ email }).lean()

            if (holderShop) {
                return {
                    code: 'xxx',
                    message: 'Shop already registered'
                }
            }

            const passwordHashed = await bcrypt.hash(password, 10)

            const newShop = await shopModel.create({ name, email, password: passwordHashed, roles: RoleShop.SHOP })

            if (newShop) {
                const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: "pkcs1",
                        format: "pem"
                    },
                    privateKeyEncoding: {
                        type: "pkcs1",
                        format: "pem"
                    },
                })

                console.log({ publicKey, privateKey })

                const publicKeyString = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })

                if (!publicKeyString) {
                    return {
                        code: 'xxx',
                        message: error.message,
                        status: 'create publicKeyString errr'
                    }
                }
                console.log("publicKeyString:::", publicKeyString)

                const publicKeyObject = crypto.createPublicKey(publicKeyString)

                console.log("publicKeyObject:::", publicKeyObject)

                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey)

                console.log("Create token success", tokens)

                return {
                    code: "201",
                    metadata: {
                        shop: getInfoData({
                            fields: ["_id", "name", "email"],
                            object: newShop
                        }),
                        tokens
                    }
                }

            }

            return {
                code: "200",
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}


module.exports = AccessService
