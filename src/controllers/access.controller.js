"use strict"

const AccessService = require("../services/access.service")
const { Created, SuccessResponse } = require("../core/success.response")

class AccessControler {

    login = async (req, res, next) => {
        return new SuccessResponse({
            message: "login success",
            metadata: await AccessService.login(req.body)
        }).send(res)
    }
    
    logout = async (req, res, next) => {
        return new SuccessResponse({
            message: "logout success",
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        return new Created({
            message: "Registered Ok",
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }

}


module.exports = new AccessControler()
