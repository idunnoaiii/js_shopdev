const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("node:crypto")
const keyTokenService = require("./keyToken.service")
const { createTokenPair, verifyJwt } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
const { ConflictRequestError, BadRequestError, UnauthorisedError, ForbiddenError } = require("../core/error.response")

//services

const { findByEmail } = require("./shop.service")
const keytokenModel = require("../models/keytoken.model")
const { keys } = require("lodash")

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN"
}

class AccessService {

    static logout = async (keyStore) => {
        const delKey = await keyTokenService.removeById(keyStore._id)
        console.log("AccessService::logout::delKey", delKey)
        return {}
    }

    static refreshToken = async ({ refreshToken, keyStore, user }) => {


        const { userId, email } = user;

        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await keyTokenService.removeByUserId(userId)
            throw new ForbiddenError("something wrong! please login again")
        }

        if (keyStore.refreshToken != refreshToken) {
            await keyTokenService.removeByUserId(userId)
            throw new ForbiddenError("something wrong! please login again")
        }

        const foundShop = await findByEmail({ email })

        if (!foundShop) throw new ForbiddenError("something wrong! please login again")

        const tokenPair = await createTokenPair({ userId, email }, keyStore.publicKey, keyStore.privateKey)

        const updateResult = await keyTokenService.updateUsedRefreshToken(tokenPair.refreshToken, refreshToken)
        
        if (!updateResult) {
            throw new Error("error update used refresh token")
        }

        return {
            user,
            tokenPair
        }

    }

    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email })

        if (!foundShop)
            throw new BadRequestError("shop not registerd")

        const passwordMatch = await bcrypt.compare(password, foundShop.password)

        if (!passwordMatch)
            throw new UnauthorisedError("authentication error")


        let privateKey = crypto.randomBytes(64).toString("hex")
        let publicKey = crypto.randomBytes(64).toString("hex")

        const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey)

        await keyTokenService.createKeyToken({
            userId: foundShop._id,
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
        })

        return {
            shop: getInfoData({
                fields: ["_id", "name", "email"],
                object: foundShop
            }),
            tokens
        }
    }

    static signUp = async ({ name, email, password }) => {

        const holderShop = await shopModel.findOne({ email }).lean()

        if (holderShop) {
            throw new ConflictRequestError("shop already registered!")
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const newShop = await shopModel.create({ name, email, password: passwordHashed, roles: RoleShop.SHOP })

        if (!newShop)
            throw new Error("failed to create new shop")

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
            return new Error('create publicKeyString errr')
        }


        const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

        return {
            shop: getInfoData({
                fields: ["_id", "name", "email"],
                object: newShop
            }),
            tokens
        }

    }
}


module.exports = AccessService
