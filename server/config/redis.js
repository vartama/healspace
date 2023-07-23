const Redis = require("ioredis");
module.exports = new Redis({
  port: 12623,
  host: process.env.REDIS_HOST || '',
  password: process.env.REDIS_PASSWORD || ''
})
