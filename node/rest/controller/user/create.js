module.exports = function creatUser(req, res, next) {
	// body...
	res.send({message: 'Criando usuário!'});
	return next();
};