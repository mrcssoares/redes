var restify = require('restify');

var server = restify.createServer();
module.exports = server;

require('./route');