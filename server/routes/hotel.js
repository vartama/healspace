const express = require('express')
const HotelController = require('../controllers/hotel')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/', authentication, HotelController.create)
router.get('/', authentication, HotelController.findAll)
router.get('/facilities', authentication, HotelController.findFacilities)
router.post('/facilities', authentication, HotelController.addFacility)
router.get('/:id', authentication, HotelController.findOne)
router.put('/:id/rating', authentication, HotelController.updateRating)

module.exports = router