'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function(server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function(Socket) {
        console.log('HELLO SOCKET')
            // Now have access to socket, wowzers!
        Socket.on('comment', function(comment) {
            console.log("HELLO I MADE IT")
            Socket.broadcast.emit('post', comment)
        })
    });

    return io;

};