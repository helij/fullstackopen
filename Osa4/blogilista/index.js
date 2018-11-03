
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const config = require('./utils/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(bodyParser.json())

mongoose.Promise = global.Promise

app.use(express.static('build'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)


server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}