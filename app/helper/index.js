const router = require('express').Router();

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

module.exports = {
    route
}