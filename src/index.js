const express = require('express')
const { logRequests } = require('./middlewares')
const routes = require('./routes')
const server = express()

server.use(express.json())
server.use(logRequests)
server.use(routes)

server.listen(3000);