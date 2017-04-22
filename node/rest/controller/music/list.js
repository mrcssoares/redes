module.exports = function listMusic(req, res, next) {
	// body...
    var musicas = [
        {id: '1', nome: 'Musica top', cantor: '9999-2222'},
        {id: '2', nome: 'Aquela da arara', cantor: '9999-3333'},
        {id: '3', nome: 'Hino nacional', cantor: '9999-9999'}
    ];
	console.log('Listando Musicas!');
	res.send(musicas);
	return next();


};