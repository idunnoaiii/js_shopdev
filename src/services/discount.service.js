"use strict"

const { min, filter } = require("lodash")
const { BadRequestError, NotFoundError } = require("../core/error.response")
const discountModel = require("../models/discount.model")
const { convertToObjectIdMongo } = require("../utils")
const { findAllProducts } = require("../models/repo/product.repo")
const { findAllDiscountCodesUnselect, checkDiscountExists } = require("../models/repo/discount.repo")

class DiscountService {
    static async createDiscountCode(payload) {
        const
            { code, start_date, end_date, is_active,
                shopId, min_order_value, product_ids, applies_to,
                name, description, type, value, max_value, max_uses, uses_count, max_uses_per_user
            } = payload

        if (new Date() < new Date(start_date) || new Date() < new Date(end_date)) {
            throw new BadRequestError("discount code has expired")
        }

        if (new Date(end_date) <= new Date(start_date)) {
            throw new BadRequestError("start date must be before end date")
        }

        const foundDiscount = await discountModel.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongo(shopId)
        }).lean()

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestError("discount exists")
        }

        const newDiscount = await discountModel.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_code: code,
            max_value: value,
            discount_min_order_value: min_order_value || 0,
            discount_max_value: max_value,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            // discount_users_used: users_us
            discount_shopId: shopId,
            discount_max_uses_per_user: max_uses_per_user,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to == "all" ? [] : product_ids
        })


        return newDiscount

    }

    static async updateDiscountCode() {

    }

    static async getAllProductsForDiscountCode({
        code, shopId, userId, limit, page
    }) {

        const foundDiscount = await discountModel.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongo(shopId)
        }).lean()

        if (!foundDiscount || !foundDiscount.discount_is_active) {
            throw new NotFoundError("discount not exists")
        }

        const { discount_applies_to, discount_product_ids } = foundDiscount

        let products

        if (discount_applies_to == "all") {
            products = await findAllProducts({
                filter: {
                    product_shop: convertToObjectIdMongo(shopId),
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: "ctime",
                select: ["product_name"]
            })
        }

        if (discount_applies_to == "specific") {
            products = await findAllProducts({
                filter: {
                    _id: { $in: discount_product_ids },
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: "ctime",
                select: ["product_name"]
            })
        }


        return products

    }


    static async getAllDiscountCodesOfShop({ limit, page, shopId }) {
        const discounts = await findAllDiscountCodesUnselect({
            limit: +limit,
            page: +page,
            filter: {
                discount_shopId: shopId,
                discount_is_active: true
            },
            unselect: ["__v", "discount_shopId"],
            model: discountModel
        })

        return discounts
    }

    static async getDiscountAmount({ codeId, userId, shopId, products }) {

        const foundDiscount = await checkDiscountExists(discountModel,
            filter = {
                discount_code: codeId,
                discount_shopId: convertToObjectIdMongo(shopId)
            })

        if (!foundDiscount) {
            throw new NotFoundError("discount does not exists")
        }

        const {
            discount_is_active,
            discount_max_uses,
            discount_start_date,
            discount_end_date,
            discount_min_order_value,
            discount_max_uses_per_user,
            discount_users_used,
            discount_type,
            discount_value
        } = foundDiscount

        if (!discount_is_active) {
            throw new BadRequestError("discount expired")
        }

        if (!discount_max_uses) {
            throw new BadRequestError("discount are out")
        }

        if (new Date() < new Date(discount_start_date) || new Date(discount_end_date) < new Date()) {
            throw new BadRequestError("discount are out")
        }

        //... others validator

        // check minimum value
        let totalOrder = 0
        if (discount_min_order_value > 0) {
            // get total of cart
            total = products.reduce((acc, product) => {
                return acc + (product.quantity * product.price)
            }, 0)

            if (total < discount_min_order_value) {
                throw new BadRequestError("discount requrie minium order value")
            }
        }

        if (discount_max_uses_per_user > 0) {
            const userUserDiscount = discount_users_used.find(x => x.userId == userId)

            if (userUserDiscount) {
                // TODO:Thien.Nguyen specify max number per user
                throw new BadRequestError("discount being used for this user")
            }
        }

        const amount = discount_type === "fixed_amount" ? discount_value : totalOrder * (discount_value / 100)

        return {
            totalOrder: totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount
        }
    }

    static async deleteDiscountCode({ codeId, shopId }) {
        const deleted = await discountModel.findOneAndDelete({
            discount_code: codeId,
            discount_shopId: shopId
        })

        return deleted
    }

    static async cancelDiscontCode({ codeId, shopId, userId }) {
        const foundDiscount = await checkDiscountExists(mode = discountModel, filter = {
            discount_code: codeId,
            discount_shopId: shopId
        })

        if (!foundDiscount) {
            throw new NotFoundError("discount does not exists")
        }


        const result = await discountModel.findByIdAndUpdate(foundDiscount._id, {
            $pull: {
                discount_users_used: userId
            },
            $inc: {
                discount_max_uses: 1,
                discount_uses_count: -1
            }
        })

        return result
    }
}


module.exports = DiscountService