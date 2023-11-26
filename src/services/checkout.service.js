
const { findCartById, checkProductByServer } = require("../models/repo/cart.repo")
const { NotFoundError, BadRequestError } = require("../core/error.response")

const discountSvc = require("../services/discount.service")

class CheckoutSerivce {


    /* payload
    {
        cartId,
        userId,
        shop_order_ids: [
            {
                shopId:
                shop_discounts: [
                    {
                        "shopId",
                        "discountId"
                        "codeId"
                    }
                ]
                item_products: [
                    {
                        price:
                        quantity:
                        productId
                    }
                ]
            }
        ]
    }
    */
    static async checkoutReview({
        cartId,
        userId,
        shop_order_ids
    }) {
        const foundCart = await findCartById(cartId)
        if (!foundCart) {
            throw new BadRequestError("cart not exisis")
        }

        const checkout_order = {
            totalPrice: 0,
            feeShop: 0,
            totalDiscount: 0,
            totalCheckout: 0
        }

        const shop_order_ids_new = []

        for (let i = 0; i < shop_order_ids.length; i++) {

            const { shopId, shop_discounts, item_products } = shop_order_ids[i]
            const productInServer = await checkProductByServer(item_products)

            if (productInServer.some(x => !x)) {
                throw new BadRequestError("order wrong")
            }

            const mergedProducts = productInServer.map(x => {
                return {
                    ...x,
                    quantity: item_products.find(y => y.productId == x.productId.toString()).quantity,
                }
            });

            const checkoutPrice = mergedProducts
                .reduce((acc, prod) => acc + (prod.quantity * prod.price), 0)

            checkout_order.totalPrice += checkoutPrice

            const item_checkout = {
                shopId,
                shop_discounts,
                price_raw: checkoutPrice,
                price_apply_discount: checkoutPrice,
                item_products: mergedProducts
            }

            if (shop_discounts.length > 0) {
                const { totalPrice = 0, discount = 0 } = await discountSvc.getDiscountAmount({

                    codeId: shop_discounts[0].codeId,
                    userId,
                    shopId,
                    products: mergedProducts
                })

                checkout_order.totalDiscount += discount

                if (discount > 0) {
                    item_checkout.price_apply_discount = checkoutPrice - discount
                }

            }

            checkout_order.totalCheckout += item_checkout.price_apply_discount
            shop_order_ids_new.push({
                shopId,
                shop_discounts,
                item_products: mergedProducts
            })

        }

        return {
            shop_order_ids,
            shop_order_ids_new,
            checkout_order
        }
    }
}


module.exports = CheckoutSerivce