const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorHandler')
const port = process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use('/api/bookings', require("./routes/bookingRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started at port ${port}`))