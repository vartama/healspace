const express = require('express')
const orderController = require('../controllers/order')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.get('/', authentication, orderController.findAll)
router.post('/book', authentication, orderController.createStripeOrder)
router.put('/status/:id', authentication, orderController.updateStatus)
router.get('/:id', authentication, orderController.findOne)

module.exports = router