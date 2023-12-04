'use strict'

const apikeyModel = require("../models/apikey.model")
const crypto = require("node:crypto")

const findById = async (key) => {
    
    // await apikeyModel.create({
    //     key: crypto.randomBytes(64).toString("hex"),
    //     status: true,
    //     permissions: ["0000"]
    // })

    const objKey = await apikeyModel.findOne({ key, status: true }).lean()
    console.log("object api key::::", objKey);
    return objKey
}

module.exports = {
    findById
}