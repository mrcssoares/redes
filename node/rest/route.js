var server = require('./server');
var controller = require('./controller');

//crud user
server.get('/user/list', controller.user.list);
server.post('/user/create',  controller.user.create);
server.put('/user/update', controller.user.update);
server.del('/user/delete/:id', controller.user.delete);

//crud music
server.get('/music/list', controller.music.list);
server.post('/music/create', controller.music.create);
server.put('/music/update', controller.music.update);
server.del('/music/delete/:id', controller.music.delete);



//home Api
server.get('/', function(req, res, next){
    res.send({
        message: 'Bem vindo a api song!'
    });

    return next();
});