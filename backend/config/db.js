const mongoose = require('mongoose')

// const connectDB = async () => {
//     try{
//         const conn = await mongoose.connect(process.env.MONGODB_URL)

//         console.log(`MongoDB connected: ${conn.connection.host}`)
//     } catch (err) {
//         console.log(err)
//         process.exit(1)
//     }
// }

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then((response) => {
            console.log(`MongoDB connected: ${response.connection.host}`)
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connectDB