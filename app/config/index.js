'use strict';

if (process.env.NODE_ENV === 'production') {
    //heroku enviroment variables
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
            consumerdKey: process.env.twConsumerdKey,
            consumerSecret: process.env.twConsumerSecret,
            callback: process.env.host + "/auth/twitter/callback",
            profileFields: ['id', 'displayName', 'photos']
        }
    }
} else {
    module.exports = require('./development.json');
}