const { Kafka, Partitioners } = require("kafkajs")


const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["127.0.0.1:9092"]
})


const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
})

const runProducer = async () => {

    await producer.connect();
    await producer.send({
        topic: "test-topic",
        messages: [
            { value: "hello kafka" }
        ]
    })

    await producer.disconnect()
}

runProducer().catch(console.error)
