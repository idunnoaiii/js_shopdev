'use strict'

const mongoose = require('mongoose')
const os = require('os')
//const process = requrie('process')
const process = require('process')

const _SECONDS = 5000

const countConnect = () => {
  const numConnection = mongoose.connections.length
  console.log(`Number of connections::${numConnection}`)
}

const checkOverload = () => {
  setInterval(() => {
    const countConnect = mongoose.connections.length 
    const numCores = os.cpus().length
    const memoryUsed = process.memoryUsage().rss

    // assume maximum numbers of connection each core is 5
    const maxConnection = numCores * 5

    console.log(`Number of connection:: ${countConnect}`)
    console.log(`Memory usage:: ${memoryUsed / 1024 / 1024} MB`)

    if (countConnect > maxConnection) {
      console.log(`Connection overload detected`)
    }

    
    
  }, _SECONDS) // monitor every 5 seconds
}

module.exports = {
  countConnect,
  checkOverload
}
