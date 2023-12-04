const { connectToRabbitMqTest } = require("../dbs/init.rabbit")

describe("Rabitmq connection", () => {
    it("should connect to rabbitmq succesfully", async () => {
        let result = await connectToRabbitMqTest()
        expect(result).toBeUndefined()
    })
})
