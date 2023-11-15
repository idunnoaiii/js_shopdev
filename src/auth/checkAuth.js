'use strict'

const { findById } = require("../services/apikey.service")
const {API_HEADER} = require("../core/app.const")


const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[API_HEADER.API_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: "Forbidden Error: apiKey is required"
            })
        }

        const objKey = await findById(key)

        console.log("middleware ::: objKey", objKey);

        if (!objKey) {
            return res.status(403).json({
                message: "Forbidden Error: apikey doese not existed"
            })
        }

        req.objKey = objKey

        return next()

    } catch (error) {
        throw error
    }
}


const permission = (permission) => {
    return (req, res, next) => {

        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: "Permission Denied"
            })
        }

        console.log("permission::", req.objKey.permissions);

        const validPermission = req.objKey.permissions.includes(permission)

        if (!validPermission) {

            return res.status(403).json({
                message: "Permission Denied"
            })
        }
        return next()
    }
}



module.exports = {
    apiKey,
    permission,
}