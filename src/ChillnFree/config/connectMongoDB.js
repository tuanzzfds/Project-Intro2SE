
const mongoose = require('mongoose')

//connect mongoDB
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
   console.log("DB connected successfully!")
})

module.exports = {
   db: db,
   mongoose: mongoose,
}
