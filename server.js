'use strict';
const express = require('express');
const app = express();
const passport = require('passport');
//my modules
const chatCat = require('./app');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs'); //automatic import by express

app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('morgan')('combined', {
    stream: {
        write: message => {
            // write to logs
            chatCat.logger.log('info', message);
        }
    }
}));

app.use('/', chatCat.router);

chatCat.ioServer(app).listen(app.get('port'), () => {
    console.log('chatcat is running at port 3000!');
})