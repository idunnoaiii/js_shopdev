const { consumeQueue, connectToRabbitMq } = require("../dbs/init.rabbit")

const messageService = {
    consumeToQueue: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMq()
            await consumeQueue(channel, queueName)
        } catch (err) {
            console.error("Error consumeToQueue", err)
            throw err
        }
    }
}

module.exports = messageService