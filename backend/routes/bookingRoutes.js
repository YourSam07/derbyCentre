const express = require('express')
const router = express.Router()
const { getBookings, bookBooking, changeBooking, cancelBooking } = require('../controllers/bookingController');

router.route('/').get(getBookings).post(bookBooking)
router.route('/:id').put(changeBooking).delete(cancelBooking)

//          OR
// router.get('/', getBookings)
// router.post('/', bookBooking)
// router.put('/:id', changeBooking)
// router.delete('/:id', cancelBooking)

module.exports = router