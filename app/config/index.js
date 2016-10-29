'use strict';

if (process.env.NODE_ENV === 'production') {
    //heroku enviroment variables
    module.exports = {
        host: process.env.host || "",
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,
        fb: {
            cliendID: process.env.fbClientID,
            clientSecret: process.env.fbClientSecret,
            callback: process.env.env.host + "/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos']
        }
    }
} else {
    module.exports = require('./development.json');
}