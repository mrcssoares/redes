var express = require("express");
var cors = require('cors');
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");

var app  = express();

var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('letsencrypt/live/api.upawa.com.br/privkey.pem'),
    cert: fs.readFileSync('letsencrypt/live/api.upawa.com.br/cert.pem')
};

function REST(){
    var self = this;
    self.connectMysql();
}

REST.prototype.connectMysql = function() {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'redes',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(cors());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header('Access-Control-Allow-Credentials', true); // If needed
          res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
          if ('OPTIONS' == req.method) {
              res.sendStatus(200);
          } else {
              next();
          }
      });
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {

    var server = https.createServer(options, app);
    var porta = 8080;
    server.listen(porta, function(){
        console.log("API Rodando na porta: "+porta+".")
    });
    // var porta = 8080;
    //   app.listen(porta, function(){
    //       console.log("API Rodando na porta "+porta+".");
    //   });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();