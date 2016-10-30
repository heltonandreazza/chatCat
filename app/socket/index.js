'use strict';

const h = require('../helpers');

module.exports = (io, app) => {
    //app.locals.chatrooms will be accessible trouth the request stream everywhere 
    //and int the routes
    let allrooms = app.locals.chatrooms;

    //listen the socket client at rooms.ejs
    io.of('/roomslist').on('connection', socket => {
        console.log('socket.io connected to client!');

        //event listener for getChatrooms
        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        })

        socket.on('createNewRoom', newRoomInput => {
            //check to see if a room with the same title exist or not
            //if not, create one and broadcast it to everyone
            if (!h.findRoomByName(allrooms, newRoomInput)) {
                //create a new room and broadcast to everyone
                allrooms.push({
                    room: newRoomInput,
                    roomID: h.randomHex(),
                    users: []
                })

                //emit an updated list to the user that are connected to the /rooms page
                //at that moment
                socket.emit('chatRoomsList', JSON.stringify(allrooms));
                //emit an updated list to everyone connected to the rooms page
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
            }
        })
    });
}