"use strict"

const { product, electronic, clothing, furniture } = require("../../models/product.model")
const { Types } = require("mongoose")
const { getSelectData, unGetSelectData } = require("../../utils")

const findAllDraftForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const findAllPublishedForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const searchProductByUser = async ({ keySearch }) => {

    const regexSearch = new RegExp(keySearch)

    const result = await product.find({
        isPublished: true,
        $text: { $search: regexSearch },
    }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } })
        .lean()

    return result
}

const queryProduct = async ({ query, limit, skip }) => {
    return await product
        .find(query)
        .populate("product_shop", "name email -_id")
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const publishProductForShop = async ({ product_shop, product_id }) => {
    const foundShop = await product
        .findOne({ product_shop: new Types.ObjectId(product_shop), _id: new Types.ObjectId(product_id) })

    if (!foundShop)
        return 0

    foundShop.isDraft = false;
    foundShop.isPublished = true;

    const { modifiedCount } = await foundShop.updateOne(foundShop)

    return modifiedCount
}

const unPublishProductForShop = async ({ product_shop, product_id }) => {
    const foundShop = await product
        .findOne({ product_shop: new Types.ObjectId(product_shop), _id: new Types.ObjectId(product_id) })

    if (!foundShop)
        return 0

    foundShop.isDraft = true;
    foundShop.isPublished = false;

    const { modifiedCount } = await foundShop.updateOne(foundShop)

    return modifiedCount
}

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 }

    const products = await product.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()

    return products

}

const findProduct = async ({ product_id, unSelect }) => {
    return await product.findById(product_id).select(unGetSelectData(unSelect))
}

const updateProductById = async ({ productId, payload, model, isNew = true }) => {
    return await model.findByIdAndUpdate(productId, payload, {
        new: isNew
    })
}

module.exports = {
    findAllDraftForShop,
    publishProductForShop,
    unPublishProductForShop,
    findAllPublishedForShop,
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById
}