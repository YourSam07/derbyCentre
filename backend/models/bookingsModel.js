const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    } 
},
{
    timestamps: true
})

module.exports = mongoose.model("Booking Details", bookingSchema)