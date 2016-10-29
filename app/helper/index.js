const router = require('express').Router();
const db = require('../db');

//iterate througth the routes objetc and mout the routes
let _registerRouter = (routes, method) => {
    for (let key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
            _registerRouter(routes[key], key);
        } else {
            //register the routes
            if (method === 'get') {
                router.get(key, routes[key]);
            } else if (method === 'post') {
                router.post(key, routes[key]);
            } else {
                router.use(routes[key]);
            }
        }
    }
}

let route = routes => {
    _registerRouter(routes);
    return router;
}

//Find a single user based on key
let findOne = profileID => {
    return db.userModel.findOne({
        'profileId': profileID
    });
}

//Create a new user and returns that instanceof
let createNewUser = profile => {
    return new Promise((resolve, reject) => {
        let newChatUser = new db.userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value
        })

        newChatUser.save(error => {
            if (error) {
                console.log('Create new user error: ');
                reject(error);
            } else {
                resolve(newChatUser);
            }
        })
    });
}

module.exports = {
    route,
    findOne,
    createNewUser
}