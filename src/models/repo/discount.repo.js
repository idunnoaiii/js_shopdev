"use strict"

const { } = require("../discount.model")
const { unGetSelectData } = require("../../utils/")

const findAllDiscountCodesUnselect = async ({
    page = 1, limit = 50, sort = "ctime",
    filter, unselect, model
}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 }

    const documents = await model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(unGetSelectData(select))
        .lean()

    return documents
}


module.exports = {
    findAllDiscountCodesUnselect
}