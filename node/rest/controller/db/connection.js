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
    console.log('The solution is: ', rows[0].solution);
    connection.end();
});

connection.execute('SELECT 1 + ? + ? AS result', [5, 6], function(err, rows) {
    // rows: [ { result: 12 } ]
    // internamente 'SELECT 1 + ? + ? AS result' é preparado primeiro.
    // Nas próximas execuções, o statement em cache é reutilizado,
    // sem a necessidade de ser preparado novamente.
});