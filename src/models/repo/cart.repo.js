const cartModel = require("../cart.model")
const { convertToObjectIdMongo } = require("../../utils")

const findCartById = async (cartId) => {
    return await cartModel.findOne({ _id: convertToObjectIdMongo(convertOb), cart_state: "active" }).lean()
}

const checkProductByServer = async (products) => {
    return Promise.all(products.map(async product => {
        const foundProduct = await getProductById(product.prodcutId)
        if (foundProduct) {
            return {
                price: foundProduct.price,
                quantity: foundProduct.quantity,
                productId: foundProduct.prodcutId
            }
        }
    }))
}


module.exports = {
    findCartById,
    checkProductByServer
}