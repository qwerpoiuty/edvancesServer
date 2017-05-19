'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function(server) {

    if (io) return io;

    io = socketio(server);
    var draws = {}
    var chats = {}
    io.on('connection', function(Socket) {
        //whiteboard events
        console.log('hello', Socket.id)
        Socket.on('join classroom', roomName => {
            Socket.join(roomName)
            if (!draws[roomName]) draws[roomName] = []
            else Socket.emit('board', draws[roomName])
            if (!draws[roomName]) draws[roomName] = []
            else Socket.emit('board', draws[roomName])

            Socket.on('drawing', function(start, end, color) {
                console.log('hello')
                draws[roomName].push({
                    start: start,
                    end: end,
                    color: color
                })
                Socket.broadcast.to(roomName).emit('collaboratorDraw', start, end, color)
            })

            // chat
            Socket.on('chat', function(user, message) {
                Socket.broadcast.to(roomName).emit('message incoming', user, message)
            })

        })

    });

    return io;

};