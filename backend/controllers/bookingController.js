const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')

const Bookings = require('../models/bookingsModel')
const User = require('../models/userModel')

// @desc    Get all the bookings
// @route   GET /api/bookings
// @access  Private 
const getBookings = asyncHandler(async(req, res) => {
    const bookings = await Bookings.find({ user: req.user.id })
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
        text: req.body.text, 
        user: req.user.id
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

    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the booking 
    if(booking.user.toString() != user.id){
        res.status(401)
        throw new Error('User not authorized')
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

    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the booking 
    if(booking.user.toString() != user.id){
        res.status(401)
        throw new Error('User not authorized')
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