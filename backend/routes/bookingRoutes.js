const express = require('express')
const router = express.Router()
const { getBookings, bookBooking, changeBooking, cancelBooking } = require('../controllers/bookingController');
const {protect}= require('../middleware/authMiddleware')


router.route('/').get(protect, getBookings).post(protect, bookBooking)
router.route('/:id').put(protect, changeBooking).delete(protect, cancelBooking)

//          OR
// router.get('/', getBookings)
// router.post('/', bookBooking)
// router.put('/:id', changeBooking)
// router.delete('/:id', cancelBooking)

module.exports = router