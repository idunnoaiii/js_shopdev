const mongoose = require('mongoose')

const {db} = require('../configs/config.mongodb')

const connectionStr = `mongodb://${db.host}:${db.port}/${db.name}`

class Database {

  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {

    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    console.log(`connection to ${connectionStr}`)

    mongoose.connect(connectionStr)
      .then(_ => console.log(`Connected MongoDB Success`))
      .catch(err => console.log(err))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }

}

const instanceMongoDb = Database.getInstance()

module.exports = instanceMongoDb
