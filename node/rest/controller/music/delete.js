module.exports = function delMusic(req, res, next) {
    // body...
    res.send({message: 'Deletando musica!'});
    return next();
};