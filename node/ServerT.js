/**
 * Created by marcos on 26/05/17.
 */
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var app = express();

var options = {
    cert: fs.readFileSync('http://api.upawa.com.br/letsencrypt/csr/0000_csr-certbot.pem'),
    key: fs.readFileSync('http://api.upawa.com.br/letsencrypt/keys/0000_key-certbot.pem')
};

http.createServer(app).listen(8080);
https.createServer(options, app).listen(443);