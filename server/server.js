//server
const express = require('express');
const path = require('path')
const app = express();

const port = 3000;
const publicPath = path.join(__dirname, '../public')

//socket.io
const http = require('http') // require http library
const socketIO = require('socket.io') // require socket.io
const server = http.createServer(app) //create a server so socket could listen server
const io = socketIO(server) //the server also listen socket io


//use server
app.use(express.static(publicPath))

//use socket.io
io.on('connection', socket => {
    console.log('a user is connected')

    socket.on('disconnect', () => {
        console.log('the user is disconnected')
    })

    socket.on('sendingEveryone', () => {
        socket.emit('everyoneReceive')
    }
    )
    socket.on('sendingOther', () => {
        socket.broadcast.emit('otherReceive')
    }
    )


})

server.listen(port, () => {
    console.log(`listen on port ${port}`);
})