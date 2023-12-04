const mongoose = require('mongoose')

const connectionStr = "mongodb://localhost:27017/shopdev"

mongoose.connect(connectionStr)
  .then(_ => console.log(`Connected MongoDB Success`))
  .catch(err => console.log(err))

if (1 === 0) {
  mongoose.set('debug', true)
  mongoose.set('debug', {color: true})
}

module.exports = mongoose
