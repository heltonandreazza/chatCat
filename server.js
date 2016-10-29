'use strict';
const express = require('express');
const app = express();
//my modules
const chatCat = require('./app');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs'); //automatic import by express

app.use('/', chatCat.router);

app.listen(app.get('port'), () => {
    console.log('chatcat is running at port 3000!');
})