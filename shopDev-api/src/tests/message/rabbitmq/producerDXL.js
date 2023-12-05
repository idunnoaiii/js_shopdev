const amqp = require("amqplib")
const message = "hello neith"


const runProducer = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const notiExchange = "notiExchange"
        const notiQueue = "notiQueue"
        const notiExchangeDLX = "notiExchangeDLX"
        const notiRoutingKeyDLX = "notiRoutingKeyDLX"

        await channel.assertExchange(notiExchange, 'direct', {
            durable: true
        })

        const queue = await channel.assertQueue(notiQueue, {
            exclusive: false,
            deadLetterExchange: notiExchangeDLX,
            deadLetterRoutingKey: notiRoutingKeyDLX
        })

        await channel.bindQueue(queue.queue, notiExchange)

        const msg = "a new product created"

        await channel.sendToQueue(queue.queue, Buffer.from(msg), {
            expiration: "10000"
        })

        setTimeout(() => {
            connection.close()
            process.exit(0)
        }, 500)
    }
    catch (err) {
        console.log(err)
    }

}

runProducer().catch(console.error)