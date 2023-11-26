const InventorySvc = require("../services/inventory.service")
const { Ok, SuccessResponse } = require("../core/success.response")

class InventoryController {

    addStockToInventory = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await InventorySvc.addStockToInventory({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res)
    }

}


module.exports = new InventoryController()