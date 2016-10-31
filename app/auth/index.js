'use strict';
const passport = require('passport');
const config = require('../config');
const logger = require('../logger');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id); //id mlab
    });

    passport.deserializeUser((id, done) => {
        //find  the user using the _id
        h.findById(id)
            .then(user => done(null, user))
            .catch(error => logger.log('error','Error when deserializing the user ' + error))
    })

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
                        .catch(error => logger.log('error','Error when creating new user' + error))
                }
            });
    }

    passport.use(new FacebookStrategy(config.fb, authProcessor));
    passport.use(new TwitterStrategy(config.twitter, authProcessor));
}