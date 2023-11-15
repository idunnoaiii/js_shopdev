'use strict'


const { API_HEADER } = require("../core/app.const")

const jwt = require('jsonwebtoken')
const asyncHandler = require("../helpers/asyncHandler")
const keyTokenService = require("../services/keyToken.service")
const { NotFoundError, UnauthorisedError } = require("../core/error.response")

const createTokenPair = async (playload, publicKey, privateKey) => {
    try {
        const accessToken = jwt.sign(playload, publicKey, {
            expiresIn: "2 days"
        })
        const refreshToken = jwt.sign(playload, privateKey, {
            expiresIn: "7 days"
        })


        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log("error verify token::::", err);
            } else {
                console.log("decode verify::::", decode);
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        throw error
    }
}


const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[API_HEADER.CLIENT_ID]

    if (!userId) throw new UnauthorisedError("missing client id")

    const keyStore = await keyTokenService.findByUserId(userId)

    if (!keyStore) throw new NotFoundError("keystore not found")

    const accessToken = req.headers[API_HEADER.AUTHORIZATION]

    if (!accessToken) throw new UnauthorisedError("missing access token")

    try {
        const decodedUser = jwt.verify(accessToken, keyStore.publicKey)

        if (userId !== decodedUser.userId) {
            throw new UnauthorisedError("invalid user")
        }


        req.keyStore = keyStore
        return next()

    } catch (err) {
        throw err
    }

})

module.exports = {
    createTokenPair,
    authentication
}