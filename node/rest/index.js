var server = require('./server');
var port = 9090;

server.listen(port, function(){
	console.log('API Redes %j', server.address());
});