const amqp = require("amqplib")

const connectToRabbitMq = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost")

        if (!connection) {
            throw new Error("connect failed")
        }

        const channel = await connection.createChannel()

        return {
            channel, connection
        }

    } catch (err) {
        console.error(err)
        throw err
    }
}

const consumeQueue = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName, { durable: true })

        channel.consume(queueName, (message) => {
            console.log(`received ${queueName}:::`, message.content.toString())
        }, {
            noAck: true
        })
    } catch (err) {
        console.error(err)
        throw err
    }
}


const connectToRabbitMqTest = async () => {
    
    try {
        const { channel, connection } = await connectToRabbitMq()
        const queueName = "test"
        const message = "hello from neith"

        await channel.assertQueue(queueName, {
            durable: true
        })

        channel.sendToQueue(queueName, Buffer.from(message))

        await connection.close()

    } catch (err) {
        console.error(err)
    }
}


module.exports = {
    connectToRabbitMq,
    connectToRabbitMqTest,
    consumeQueue
}