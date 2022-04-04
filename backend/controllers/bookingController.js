const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')

const Bookings = require('../models/bookingsModel')

// @desc    Get all the bookings
// @route   GET /api/bookings
// @access  Private 
const getBookings = asyncHandler(async(req, res) => {
    const bookings = await Bookings.find()
    res.status(200).json(bookings)
})

// @desc    Book a slot
// @route   POST /api/bookings
// @access  Private 
const bookBooking = asyncHandler(async(req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const booking = await Bookings.create({
        text: req.body.text
    })

    res.status(200).json(booking)
})

// @desc    Chaneg slot Timimngs
// @route   PUT /api/bookings/:id
// @access  Private 
const changeBooking = asyncHandler(async(req, res) => {
    const booking = await Bookings.findById(req.params.id)

    if(!booking) {
        throw new Error('Booking not Found')
    }

    const updatedBooking = await Bookings.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedBooking)
})

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private 
const cancelBooking = asyncHandler(async(req, res) => {
    const booking = await Bookings.findById(req.params.id)

    if(!booking){
        res.status(400)
        throw new Error('Booking not Found')
    }

    await booking.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getBookings, 
    bookBooking,
    changeBooking,
    cancelBooking
}