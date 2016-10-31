'use strict';

if (process.env.NODE_ENV === 'production') {
    //heroku enviroment variables
    // process.env.REDIS_URL :: redis://redistogo:asdasdasfaf@asd.redistogo:9899/
    let redisURI = require('url').parse(process.env.REDIS_URL);
    let redisPassword = redisURI.auth.split(':')[1];
    module.exports = {
        host: process.env.host || "",
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,
        fb: {
            clientID: process.env.fbClientID,
            clientSecret: process.env.fbClientSecret,
            callback: process.env.host + "/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos']
        },
        twitter: {
            consumerKey: process.env.twConsumerKey,
            consumerSecret: process.env.twConsumerSecret,
            callback: process.env.host + "/auth/twitter/callback",
            profileFields: ['id', 'displayName', 'photos']
        },
        redis: {
            host: redisIRU.hostname,
            port: redisURI.port,
            password: redisPassword
        }
    }
} else {
    module.exports = require('./development.json');
}