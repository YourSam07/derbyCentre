const asyncHandler = require('express-async-handler')
const Razorpay = require('razorpay')

// Initializing RazorPay
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEYID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const razorpayPayment = asyncHandler(async (req, res) => {
    var options = {
        amount: req.body.pay * 100 ,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt1"
    };

    try {
        const response = await instance.orders.create(options);
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = {
    razorpayPayment
}