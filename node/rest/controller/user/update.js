module.exports = function updateUser(req, res, next) {
    // body...
    var musicas = [
        {id: '1', nome: 'Musica top', tipo: '9999-2222'},
        {id: '2', nome: 'Aquela da arara', tipo: '9999-3333'},
        {id: '3', nome: 'Hino nacional', tipo: '9999-9999'},
        {id: '4', nome: 'Hino nacional 2', tipo: '9999-9999'}

    ];
    console.log('Adicionando Usuario!');
    res.send(musicas);
    return next();
};