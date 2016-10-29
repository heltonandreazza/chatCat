'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

//Log an error if the connection fails
Mongoose.connection.on('error', error => {
    console.log('Mongo Db error: ', error);
})

module.exports = {
    Mongoose
}