const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.connect(config.mongoUrl)

const User = mongoose.model('User', {
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean
})

module.exports = User