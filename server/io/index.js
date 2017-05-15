'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function(server) {

    if (io) return io;

    io = socketio(server);
    var draws = {}
    io.on('connection', function(Socket) {
        //whiteboard events
        console.log('hello', Socket.id)
        Socket.on('join classroom', roomName => {
            console.log('hello i got this far', roomName)
            Socket.join(roomName)
            if (!draws[roomName]) draws[roomName] = []
            else socket.emit('board', draws[roomName])

            Socket.on('drawing', function(start, end, color) {
                console.log('hello')
                draws[roomName].push({
                    start: start,
                    end: end,
                    color: color
                })
                socket.broadcast.to(roomName).emit('collaboratorDraw', start, end, color)
            })

            // Socket.on()

        })

    });

    return io;

};