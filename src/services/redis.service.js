const { resolve } = require("path")
const redis = require("redis")
const { promisify } = require("util")
const { reservationInventory } = require("../models/repo/iventory.repo")
const redisClient = redis.createClient()


const pexpire = promisify(redisClient.pExpire).bind(redisClient)
const setNxAsync = promisify(redisClient.setNX).bind(redisClient)

const acquireLock = async (productId, quantity, cartId) => {
    const key = `lock_v2023_${productId}`
    const retryTimes = 10
    const expireTime = 3000

    for (let i = 0; i < retryTimes; i++) {
        const result = await setNxAsync(key, expireTime)
        if (result == 1) {
            
            const isReservation = await reservationInventory({
                productId, quantity, cartId, 
            })
            
            if (isReservation.modifiedCount > 0) {
                await pexpire(key, expireTime)
                return key
            }

            return null
            
        } else {
            await new Promise(resolve => setTimeout(resolve, 50))
        }
    }
}


const releaseLock = async keyLock => {
    const delKeyAsync = promisify(redisClient.del).bind(redisClient)
    return await delKeyAsync(keyLock)
}

module.exports = {
    acquireLock,
    releaseLock
}