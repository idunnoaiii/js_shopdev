const app =  require('./src/app')
const config = require("./src/configs/config.mongodb")

const PORT = config.app.port || 3000

const server = app.listen(PORT, () => {
    console.log(`Server start at port:${PORT}`)
})
// process.on("SIGINT", () => {
//     server.close(() => console.log('Exit server express'))
// })

