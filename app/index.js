'use strict';

//social authentication logic
require('./auth')();

module.exports = {
    router: require('./routes')(),
    session: require('./sessions')
}