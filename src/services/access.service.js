const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")


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
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096
        })
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
