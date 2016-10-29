'use strict';
const passport = require('passport');
const config = require('../config');
const h = require('../helper');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    let authProcessor = (accesToken, refreshToken, profile, done) => {
        //Find a user in the local db using profile.id
        //If the user is found, return the user data using the done()
        //If the user is not found, create one in the local db and return
        h.findOne(profile.id)
            .then(result => {
                if (result) {
                    done(null, result);
                } else {
                    //create a new user and return
                    h.createNewUser(profile)
                        .the(newChatUser => done(null, newChatUser))
                        .catch(error => console.log('Error when creating new user'))
                }
            });
    }

    passport.use(new FacebookStrategy(config.fb, authProcessor));
}