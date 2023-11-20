"use strict"

const { clothing, product, electronic, furniture } = require("../models/product.model")
const { BadRequestError } = require("../core/error.response")
const
    {
        findAllDraftForShop,
        publishProductForShop,
        findAllPublishedForShop,
        unPublishProductForShop,
        searchProductByUser,
        findAllProducts,
        findProduct
    } = require("../models/repo/product.repo")


class ProdcutFactory {

    static productRegistry = {}

    static registerProductType = (type, classRef) => {
        ProdcutFactory.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {

        const productClass = ProdcutFactory.productRegistry[type]

        if (!productClass)
            throw new BadRequestError(`Invalid type of ProductFactory ${type}`)

        return new productClass(payload).createProduct()

    }

    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true }
        return await findAllDraftForShop({ query, limit, skip })
    }

    static async publishProductByShop({ product_shop, product_id }) {
        const product = await publishProductForShop({ product_shop, product_id })
        return product
    }

    static async unPublishProductByShop({ product_shop, product_id }) {
        const product = await unPublishProductForShop({ product_shop, product_id })
        return product
    }

    static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublished: true }
        return await findAllPublishedForShop({ query, limit, skip })
    }

    static async getListSearchProduct({ keySearch }) {
        return await searchProductByUser({ keySearch })
    }

    static async findAllProducts({ limit = 50, sort = "ctime", page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({ limit, sort, page, filter, select: ["product_name", "product_price", "product_thumb"] })
    }

    static async findProduct({ product_id }) {
        return await findProduct({ product_id, unSelect: ["__v"] })
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

    async createProduct(productId) {
        return await product.create({ ...this, _id: productId })
    }
}


class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attribute,
            product_shop: this.product_shop
        })
        if (!newClothing) throw new BadRequestError("error create clothing")

        const newProduct = await super.createProduct(newClothing)
        if (!newProduct) throw new BadRequestError("error create clothing")

        return newProduct
    }
}

class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronic.create({
            ...this.product_attribute,
            product_shop: this.product_shop
        })
        if (!newElectronic) throw new BadRequestError("error create clothing")

        const newProduct = await super.createProduct(newElectronic)
        if (!newProduct) throw new BadRequestError("error create clothing")

        return newProduct
    }
}

class Furniture extends Product {
    async createProduct() {
        const newFurniture = await furniture.create({
            ...this.product_attribute,
            product_shop: this.product_shop
        })
        if (!newFurniture) throw new BadRequestError("error create furniture")

        const newProduct = await super.createProduct(newFurniture)
        if (!newProduct) throw new BadRequestError("error create furniture")

        return newProduct
    }
}

ProdcutFactory.registerProductType("Electronic", Electronic)
ProdcutFactory.registerProductType("Clothing", Clothing)
ProdcutFactory.registerProductType("Furniture", Furniture)

module.exports = ProdcutFactory
