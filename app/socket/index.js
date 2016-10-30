'use strict';

module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;

    allrooms.push({
        room: 'Good Food',
        roomID: '0001',
        users: []
    })

    allrooms.push({
        room: 'Cloud computing',
        roomID: '0002',
        users: []
    })

    //listen the socket client at rooms.ejs
    io.of('/roomslist').on('connection', socket => {
        console.log('socket.io connected to client!');

        //event listener for getChatrooms
        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        })
    });
}