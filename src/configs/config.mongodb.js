const dev = {

  app: {
    port: process.env.DEV_PORT
  },

  db: {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_NAME,
  }

}


const pro = {
  
  app: {
    port: process.env.PORT
  },

  db: {
    host: process.env.PRO_DB_HOST,
    port: process.env.PRO_DB_PORT,
    name: process.env.PRO_DB_NAME,
  }
}

const config = {dev, pro}
const env = process.env.NOVE_ENV || 'dev'

module.exports = config[env]
