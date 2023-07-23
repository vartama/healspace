const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const hotelRouter = require('./hotel')
const orderRouter = require('./order')

router.use('/users', userRouter)
router.use('/hotels', hotelRouter)
router.use('/orders', orderRouter)

module.exports = router