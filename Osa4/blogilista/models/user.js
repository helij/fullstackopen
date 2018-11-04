const mongoose = require('mongoose')
const Blog = require('../models/blog')

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
  return {
    _id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs.map(Blog.format)
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User