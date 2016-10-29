'use strict';
const help = require('../helper');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/rooms': (req, res, next) => {
                res.render('rooms');
            },
            '/chat': (req, res, next) => {
                res.render('chatroom');
            }
            // '/getsession': (req, res, next) => {
            //     res.end('My favorite color is ' + req.session.favColor);
            // },
            // '/setsession': (req, res, next) => {
            //     req.session.favColor = "RED";
            //     res.send('session set');
            // }
        },
        'post': {

        },
        'NA': (req, res, next) => {
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }
    }

    return help.route(routes);
}