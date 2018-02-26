const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const blogsRouter = require('./controllers/blogs')

const config = require('./utils/config')

mongoose.connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

mongoose.Promise = global.Promise

morgan.token('post_data', function (req) { return JSON.stringify(req.body) })

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :post_data :status :res[content-length] - :response-time ms'))

app.use('/api/blogs', blogsRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}