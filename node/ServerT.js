var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('letsencrypt/live/api.upawa.com.br/privkey.pem'),
    cert: fs.readFileSync('letsencrypt/live/api.upawa.com.br/cert.pem')
};

https.createServer(options, function (req, res) {
    console.log('Na 80');
    res.writeHead(200);
    res.end("hello world\n");
}).listen(8080);
