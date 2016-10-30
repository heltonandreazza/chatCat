'use strict';

//social authentication logic
require('./auth')();

//Create an IO Server instance
let ioServer = app => {
    app.locals.chatrooms = [];
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    io.use((socket, next) => {
        require('./sessions')(socket.request, {}, next);
    })
    require('./socket')(io, app);
    return server;
}

module.exports = {
    router: require('./routes')(),
    session: require('./sessions'),
    ioServer
}