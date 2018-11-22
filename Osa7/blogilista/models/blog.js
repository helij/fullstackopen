const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  id: String,
  likes: Number,
  author: String,
  title: String,
  url: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

blogSchema.statics.format = (blog) => {
  return {
    _id: blog._id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    user: blog.user
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog