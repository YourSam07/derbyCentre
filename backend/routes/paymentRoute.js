const express= require('express')
const  { razorpayPayment } = require('../controllers/paymentController')
const router = express.Router()

router.post('/razorpay', razorpayPayment)

module.exports = router