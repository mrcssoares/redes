module.exports = function delUser(req, res, next) {
    // body...
    res.send({message: 'Deletando usuário!'});
    return next();
};