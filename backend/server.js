const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorHandler')
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/bookings', require("./routes/bookingRoutes"));
app.use('/api/users', require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started at port ${port}`))