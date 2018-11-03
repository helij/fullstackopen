const http = require('http')
const Blog = require('../models/blog')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
//const server = http.createServer(app)
//const mongoose = require('mongoose')
//const config = require('../utils/config')


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

module.exports = {
  app
}