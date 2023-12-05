const { consumeQueue, connectToRabbitMq } = require("../dbs/init.rabbit")

const log = console.log


console.log = function () {
    log.apply(console, [new Date()].concat(arguments))
}

const messageService = {
    consumeToQueue: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMq()
            await consumeQueue(channel, queueName)
        } catch (err) {
            console.error("Error consumeToQueue", err)
            throw err
        }
    },

    consumeToQueueNormal: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMq()

            const notiQueue = "notiQueue"

            // 1. TTL
            // channel.consume(notiQueue, msg => {
            //     console.log(`RECEIVED: queue:::${notiQueue}`, msg.content.toString());
            //     channel.ack(msg)
            // })

            // 2. LOGIC
            channel.consume(notiQueue, msg => {
                try {
                    const numberTest = Math.random()
                    if (numberTest < 0.8) {
                        console.log(numberTest);
                        throw new Error(`Handle message failed :::${notiQueue}`, msg.content.toString())
                    }

                    channel.ack(msg)
                    console.log("Handle message successed", msg.content.toString());
                } catch (error) {
                    /**
                     * first false: whether or not push the msg back to queue
                     * second false: refuse sequence msg (NO! just refuse current msg)
                     */
                    channel.nack(msg, false, false) // negative acknownledgemant
                }
            })


        } catch (error) {
            console.error(error)
        }
    },

    consumeToQueueFailed: async (queueName) => {

        try {
            const { channel, connection } = await connectToRabbitMq()
            const notiExchangeDLX = "notiExchangeDLX"
            const notiRoutingKeyDLX = "notiRoutingKeyDLX"
            const notiQueueHandler = "notiQueueErrorHotFix"

            await channel.assertExchange(notiExchangeDLX, "direct", {
                durable: true
            })

            const queueResult = await channel.assertQueue(notiQueueHandler, {
                exclusive: false
            })

            await channel.bindQueue(queueResult.queue, notiExchangeDLX, notiRoutingKeyDLX)

            await channel.consume(queueResult.queue, failedMsg => {
                console.log(`RECEIVED-FAILED: queu:::${queueResult.queue}`, failedMsg.content.toString())
            }, {
                noAck: true
            })


        } catch (error) {
            console.error(error)
            throw error
        }
    },

}

module.exports = messageService