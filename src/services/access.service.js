const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("node:crypto")
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
                // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: "pkcs1",
                //         format: "pem"
                //     },
                //     privateKeyEncoding: {
                //         type: "pkcs1",
                //         format: "pem"
                //     },
                // })

                let privateKey = crypto.randomBytes(64).toString("hex")
                let publicKey = crypto.randomBytes(64).toString("hex")


                console.log({ publicKey, privateKey })

                const keyStore = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) {
                    return {
                        code: 'xxx',
                        message: error.message,
                        status: 'create publicKeyString errr'
                    }
                }

                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

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
