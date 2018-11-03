
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const config = require('./utils/config')
const mongoose = require('mongoose')

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}