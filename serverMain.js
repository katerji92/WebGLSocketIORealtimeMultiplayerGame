var express = require('express');

var app = express();

var http = require('http').Server(app);

var clientServices = require('./app/client')(app);
var backendServices = require('./server/backend')(app);

http.listen(3000, function(){

});