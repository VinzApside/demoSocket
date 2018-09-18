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
    let who = socket.id
    console.log(`${who} is connected`)

    socket.on('disconnect', () => {
        console.log(`${who} is gone`)
    })

    socket.on('connect_error', () => {
        socket.emit('erreur')
    })


    socket.on('sendingEveryone', (data) => {
        console.log('everyone');
        console.log(data);
        io.emit('everyoneReceive', data)
    }
    )
    socket.on('sendingOther', (information) => {
        console.log('others');
        console.log(information);
        socket.broadcast.emit('otherReceive', (information))
    }
    )

    socket.on('justMe', () => {
        console.log('me');
        socket.emit('meReceive', (4+2));
    })

    socket.on('pokeHim', (socketId) => {
        console.log(socketId)
        io.to(`${socketId}`).emit('poke');
    })


})

server.listen(port, () => {
    console.log(`listen on port ${port}`);
})