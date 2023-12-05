const { } = require("./src/services/consumeQueue.service")

const { consumeToQueue, consumeToQueueFailed, consumeToQueueNormal } = require("./src/services/consumeQueue.service")

const queueName = "test-topic"

// consumeToQueue(queueName)
//     .then(() => {
//         console.log(`Message consumer running ${queueName}`)
//     })
//     .catch(console.error)

consumeToQueueNormal(queueName)
    .then(() => {
        console.log(`Message consumer normal running ${queueName}`)
    })
    .catch(console.error)

consumeToQueueFailed(queueName)
    .then(() => {
        console.log(`Message consumer failed running ${queueName}`)
    })
    .catch(console.error)


