module.exports = function creatMusic(req, res, next) {
	// body...
	res.send({message: 'Criando musica!'});
	return next();
};