const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const Mongo = mongoose.connection

Mongo.on('open', () => console.log('Init database'))
Mongo.on('error', console.error)

module.exports = mongoose