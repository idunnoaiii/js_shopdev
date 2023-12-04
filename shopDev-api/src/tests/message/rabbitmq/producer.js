const amqp = require("amqplib")
const message = "hello neith"


const runProducer = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const queueName = "test-topic"

        await channel.assertQueue(queueName, {
            durable: true
        })

        channel.sendToQueue(queueName, Buffer.from(message))
        
        setTimeout(() => {
           connection.close() 
        }, 1000);
    }
    catch (err) {
        console.log(err)
    }

}

runProducer().catch(console.error)
