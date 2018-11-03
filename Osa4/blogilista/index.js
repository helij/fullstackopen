
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const config = require('./utils/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')

app.use(cors())
app.use(bodyParser.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}