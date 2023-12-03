const amqp = require("amqplib")
const message = "hello neith"


const runConsumer = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()
        const queueName = "test-topic"
        await channel.assertQueue(queueName, {
            durable: true
        })


        channel.consume(queueName, (message) => {
            console.log("received message::::", message.content.toString())
        }, {
            noAck: true
        })

    }
    catch (err) {
        console.log(err)
    }

}

runConsumer().catch(console.error)