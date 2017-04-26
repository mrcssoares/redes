module.exports = function listUser(req, res, next) {
	// body...
    var util = require('util');
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'redes'
    });
    connection.connect();

    connection.query('SELECT * from `redes`.`user`', function(err, rows, fields) {
        if (err) throw err;
        console.log('Listando usuarios: ', rows);
        res.send(rows);

        connection.end();
        return next();
    });


};