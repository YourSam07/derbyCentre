const asyncHandler = require('express-async-handler')

// @desc    Get all the bookings
// @route   GET /api/bookings
// @access  Private 
const getBookings = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Get Bookings'})
})

// @desc    Book a slot
// @route   POST /api/bookings
// @access  Private 
const bookBooking = asyncHandler(async(req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
})

// @desc    Chaneg slot Timimngs
// @route   PUT /api/bookings/:id
// @access  Private 
const changeBooking = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Change timing of Booking ${req.params.id}`})
})

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private 
const cancelBooking = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete Booking ${req.params.id}`})
})

module.exports = {
    getBookings, 
    bookBooking,
    changeBooking,
    cancelBooking
}