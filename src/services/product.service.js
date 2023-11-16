"use strict"

const { clothing, product, electronic } = require("../models/product.model")
const { BadRequestError } = require("../core/error.response")

class ProdcutFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case "Electronic":
                return new Electronic(payload).createProduct()
            case "Clothing":
                return new Clothing(payload).createProduct()
            default:
                throw new BadRequestError(`Invalid type of ProductFactory ${type}`)
        }
    }
}

class Product {
    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_type,
        product_quantity,
        product_attribute,
        product_shop
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_type = product_type
        this.product_quantity = product_quantity
        this.product_attribute = product_attribute
        this.product_attribute = product_attribute
        this.product_shop = product_shop
    }

    async createProduct() {
        return await product.create(this)
    }
}


class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attribute)
        if (!newClothing) throw new BadRequestError("error create clothing")

        const newProduct = await super.createProduct()
        if (!newProduct) throw new BadRequestError("error create clothing")

        return newProduct
    }
}

class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronic.create(this.product_attribute)
        if (!newElectronic) throw new BadRequestError("error create clothing")

        const newProduct = await super.createProduct()
        if (!newProduct) throw new BadRequestError("error create clothing")

        return newProduct
    }
}


module.exports = ProdcutFactory
