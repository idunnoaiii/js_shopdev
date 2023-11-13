'use strict'

const jwt = require('jsonwebtoken')

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

    }
}


module.exports = {
    createTokenPair
}