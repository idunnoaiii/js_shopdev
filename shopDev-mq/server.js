const { } = require("./src/services/consumeQueue.service")

const { consumeToQueue } = require("./src/services/consumeQueue.service")

const queueName = "test-topic"

consumeToQueue(queueName)
    .then(() => {
        console.log(`Message consumer running ${queueName}`)
    })
    .catch(console.error)


