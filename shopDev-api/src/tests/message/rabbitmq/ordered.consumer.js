const amqp = require("amqplib")

const runOrderConsumer = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const queueName = "order-queued-message"

        await channel.assertQueue(queueName, {
            durable: true
        })

        channel.prefetch(1)

        channel.consume(queueName, msg => {
            const message = msg.content.toString()

            setTimeout(() => {
                console.log(`process ${message}`)
                channel.ack(msg)
                 
            }, Math.random() * 1000);
        })

    }
    catch (err) {
        console.log(err)
    }

}


runOrderConsumer().catch(console.error)