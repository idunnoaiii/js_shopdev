/**
 * 1. add product to card [user]
 * 2. decrease product quantity by 1 [user]
 * 3. increase product quantity by 1 [user]
 * 4. get cart [user]
 * 5. delete cart [user]
 * 6. delete cart item [user]
 */

const cartModel = require("../models/cart.model");

const { getProductById, findAllProducts } = require("../models/repo/product.repo")
const { NotFoundError, BadRequestError } = require("../core/error.response")


class CartService {


    static async createUserCart({ userId, product }) {
        const query = { cart_userId: userId, cart_state: "active" }

        const correspondingProduct = await getProductById(product.productId)

        if (!correspondingProduct)
            throw new BadRequestError("invalid productId")

        const insertProduct = { ...product, name: correspondingProduct.product_name, price: correspondingProduct.product_price }

        const updateOrInsert = {
            $addToSet: {
                cart_products: insertProduct
            }
        }

        const options = {
            upsert: true,
            new: true
        }

        return await cartModel.findOneAndUpdate(query, updateOrInsert, options)
    }


    static async updateUserCartQuantity({ userId, product }) {

        const { productId, quantity } = product

        const query = {
            cart_userId: userId,
            "cart_products.productId": productId,
            cart_state: "active"
        }

        const updateSet = {
            $inc: {
                "cart_products.$.quantity": quantity
            }
        }

        const options = {
            upsert: true,
            new: true
        }

        return await cartModel.findOneAndUpdate(query, updateSet, options)
    }

    static async addToCart({ userId, product }) {
        const userCart = await cartModel.findOne({
            cart_userId: userId
        })

        if (!userCart) {
            return await this.createUserCart({ userId, product })
        }

        if (userCart.cart_products.length === 0) {
            userCart.cart_products = [product]
            return userCart.save()
        }

        return this.updateUserCartQuantity({ userId, product })

    }

    /** 
    
    {
        product : {
            quantity:
            price:
            shopId:
            old_quantity,
            productId
        }
        version
    }
    */
    static async addToCartV2({ userId, shop_order_ids }) {
        const { productId, quantity, old_quantity } = shop_order_ids[0]?.item_products[0]
        const foundProduct = await getProductById(productId)

        if (!foundProduct)
            throw new NotFoundError("product not found")

        if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId) {
            throw new NotFoundError("product does not belong to shop")
        }

        if (quantity === 0) {
            // delete
        }

        return await this.updateUserCartQuantity({
            userId,
            product: {
                price: foundProduct.price,
                name: foundProduct.name,
                productId,
                quantity: quantity - old_quantity
            }
        })

    }

    static async deleteUserCart({ userId, productId }) {

        const query = { cart_userId: userId, cart_state: "active" }

        const updateSet = {
            $pull: {
                cart_products: {
                    productId
                }
            }
        }

        const deleteCart = cartModel.updateOne(query, updateSet)
        return deleteCart
    }

    static async getListUserCart({ userId }) {
        return await cartModel.findOne({
            cart_userId: +userId
        }).lean()
    }

}


module.exports = CartService