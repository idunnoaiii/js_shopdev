const redisPubSubService = require("../services/redisPubSub.service")

const order = {
    productId: "productId",
    quantity: 1000
}

redisPubSubService.publish("purchase_event", JSON.stringify(order)).then(res => console.log(res))

