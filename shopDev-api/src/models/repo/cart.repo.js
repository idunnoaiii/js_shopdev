const cartModel = require("../cart.model")
const { convertToObjectIdMongo } = require("../../utils")
const {getProductById} = require("../repo/product.repo")

const findCartById = async (cartId) => {
    return await cartModel.findOne({ _id: convertToObjectIdMongo(cartId), cart_state: "active" }).lean()
}

const checkProductByServer = async (products) => {
    return Promise.all(products.map(async product => {
        const foundProduct = await getProductById(product.productId)
        if (foundProduct) {
            return {
                price: foundProduct.product_price,
                quantity: foundProduct.product_quantity,
                productId: foundProduct._id
            }
        }
    }))
}


module.exports = {
    findCartById,
    checkProductByServer
}