const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io')

const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('on-chat', data => {
    io.emit('user-chat', data)
  })
})

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})
