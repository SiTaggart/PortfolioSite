var compression = require('compression');
var express = require('express');
var app = express();
var routes = require('./server/routes');

app.use(compression());
app.use(express.static(__dirname + '/public'));

app.get('/tweets', routes.getTweets);

app.listen(process.env.PORT || 5000);
