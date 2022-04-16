const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    bookingName: {
        type: String,
        required: [true, 'Please add a text value']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please add a text value']
    },
    address: {
        type: String,
        required: [true, 'Please add a text value']
    },
    date: {
        type: Date,
        required: [true, 'Please enter a date']
    },
    startTime: {
        type: String,
        required: [true, 'Please add a text value']
    },
    endTime: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Booking Details", bookingSchema)