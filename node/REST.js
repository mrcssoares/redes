var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    var auth = "redesEtop";
    var tokenInvalido = {
        success: false,
        message: 'Acesso negado!'
    };

    router.get("/",function(req,res){
       res.json({"Message": "Bem vindo a api songUkê !"});
    });

    //=================================== START CRUD USERS =======================================//

    router.get("/users",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT * FROM ??";
            var table = ["user"];
            query = mysql.format(query, table);
            connection.query(query, function (err, rows) {
                if (err) {
                    console.log('get /users 400 ERROR');
                    res.json({"Error": true, "Message": "Error executing MySQL query"});
                } else {
                    console.log('get /users 200 OK');
                    res.json({"Error": false, "Message": "Success", "users": rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.post("/users/empty",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT * FROM ?? WHERE ?? LIKE ?";
            var table = ["user", "email", req.body.email];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /users/empty 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /users/empty 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "users" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.post("/users",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
            var table = ["user","name","email","photo", "type",req.body.name,req.body.email,req.body.photo, req.body.type];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('post /users 400 ERROR');
                    res.json({"Error" : err, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('post /users 400 ERROR');
                    res.json({"Error" : false, "Message" : "User Added !", "rows" :rows });
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.put("/users",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, type = 1 WHERE ?? = ?";
            var table = ["user","name",req.body.name, "email",req.body.email, "photo", req.body.photo, 'id', req.body.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('put /users 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('put /users 400 ERROR');
                    res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.delete("/users/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "DELETE from ?? WHERE ??=?";
            var table = ["user","id",req.params.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('delete /users 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('delete /users 200 OK');
                    res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.id});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });


    //=================================== END CRUD USERS =======================================//



    //=================================== START CRUD CATEGORY ===================================//

    router.get("/category",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT * FROM ??";
            var table = ["category"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /category 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /category 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "category" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.post("/category",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "INSERT INTO ??(??) VALUES (?)";
            var table = ["category", "name", req.body.name];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('post /category 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('post /category 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "category" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.delete("/category/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "DELETE from ?? WHERE ??=?";
            var table = ["category","id",req.params.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('delete /category 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('delete /category 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "category" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    //=================================== END CRUD CATEGORY ===================================//



    //=================================== START CRUD SINGER ===================================//

    router.get("/singers",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT * FROM ??";
            var table = ["singer"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /singers 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /singers 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "singers" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.post("/singers",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "INSERT INTO ??(??) VALUES (?)";
            var table = ["singer", "name", req.body.name];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('post /singers 400 ERROR');
                    res.json({"Error" : err, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('post /singers 200 OK');
                    res.json({"Error" : false, "Message" : "User Added !", "singers" :rows });
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.delete("/singers/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "DELETE from ?? WHERE ??=?";
            var table = ["singer","id",req.params.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('delete /singer 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('delete /singer 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "singer" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });


    //=================================== END CRUD SINGER ===================================//



    //=================================== START CRUD MUSICAS ===================================//
    //musics accepts
    router.get("/musics",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT music.id as music_id, music.name as music_name, singer.name as singer_name, category.name as category_name, music.status, user.id as id_user, user.name as name_user FROM ?? JOIN singer ON singer.id = music.id_singer JOIN category ON category.id = music.id_category JOIN user ON user.id = music.id_user WHERE music.status = 1";
            var table = ["music"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /musics 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /musics 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "musics" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });
    //musics sugestions
    router.get("/musics/sugestions",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT music.id as music_id, music.name as music_name, singer.name as singer_name, category.name as category_name, music.status, user.id as id_user, user.name as name_user FROM ?? JOIN singer ON singer.id = music.id_singer JOIN category ON category.id = music.id_category JOIN user ON user.id = music.id_user WHERE music.status = 0";
            var table = ["music"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /musics 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /musics 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "musics" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.get("/musics/sugestions/user/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT music.id as music_id, music.name as music_name, singer.name as singer_name, category.name as category_name, music.status, user.id as id_user, user.name as name_user FROM ?? JOIN singer ON singer.id = music.id_singer JOIN category ON category.id = music.id_category JOIN user ON user.id = music.id_user WHERE music.id_user =" + req.params.id;
            var table = ["music"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /musics 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /musics 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "musics" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });
    //update em status de musica
    router.put("/musics/status/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "UPDATE ?? SET status = 1 WHERE ?? = ?";
            var table = ["music", "id", req.params.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('put /musics 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('put /musics 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "musics" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });
    //update em status de musica
    router.put("/musics/recusar/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "UPDATE ?? SET status = 2 WHERE ?? = ?";
            var table = ["music", "id", req.params.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('put /musics 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('put /musics 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "musics" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });
    //deletar musica
    router.delete("/musics/delete/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "DELETE from ?? WHERE ??=?";
            var table = ["music","id",req.params.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('delete /musics 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('delete /musics 200 OK');
                    res.json({"Error" : false, "Message" : "Deleted the music "+req.body.id});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });
    //adicionar musica
    router.post("/musics",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "INSERT INTO ?? (name, duration, id_category, id_singer, status, id_user) VALUES ('"+ req.body.name +"', '"+req.body.duration+"', '"+req.body.id_category+"', '"+req.body.id_singer +"', '"+req.body.status+"', '"+req.body.id_user+"')";
            var table = ["music"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('post /musics 400 ERROR');
                    res.json({"Error" : err, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('post /musics 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "musics" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    //=================================== END CRUD MUSICAS =====================================//



    //=================================== START CRUD SOLICITAÇÕES ==============================//

    router.get("/solicitations/user/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            //var query = "SELECT solicitation.id as id, music.name as name_music, user.name as name_user, user.id as id_user, user.photo as photo_user, (SELECT COUNT(*) FROM likes WHERE id_solicitacao = solicitation.id and status = 1) as likes, solicitation.status, solicitation.created_at FROM ?? INNER JOIN music ON music.id = solicitation.id_music INNER JOIN user ON user.id = solicitation.id_user";
            var query = "SELECT solicitation.id as id, music.name as name_music, user.name as name_user, user.id as id_user, user.photo as photo_user, " +
                "(SELECT COUNT(*) FROM likes WHERE id_solicitacao = solicitation.id and status = 1) as likes, " +
                "(SELECT COUNT(*) FROM likes WHERE (id_solicitacao = solicitation.id and status = 1) and likes.id_usuario = ?) " +
                "as likes_me, solicitation.status, solicitation.created_at " +
                "FROM ?? " +
                "INNER JOIN music ON music.id = solicitation.id_music " +
                "INNER JOIN user ON user.id = solicitation.id_user";

            var table = [req.params.id, "solicitation"];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /solicitations 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /solicitations 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "solicitations" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    //SELECT solicitation.id as id, music.name as name_music, user.name as name_user, user.id as id_user, user.photo as photo_user, (SELECT COUNT(*) FROM likes WHERE id_solicitacao = solicitation.id and status = 1) as likes, (SELECT COUNT(*) FROM likes WHERE id_solicitacao = solicitation.id and status = 1 and likes.id_usuario = 10) as likes_me, solicitation.status, solicitation.created_at FROM solicitation INNER JOIN music ON music.id = solicitation.id_music INNER JOIN user ON user.id = solicitation.id_user
    //update em status de solicitacao
    router.put("/solicitations/status/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "UPDATE ?? SET status = status + 1 WHERE ?? = ?";
            var table = ["solicitation", "id", req.params.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('put /solicitations 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('put /solicitations 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "musics" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.post("/solicitations",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
            //var query = "INSERT INTO ?? (likes, status, id_music, id_user, created_at) VALUES ('0', '0', '1', '2', 'teste')";
            var table = ["solicitation", "likes", "status", "id_music", "id_user", "created_at", req.body.likes, req.body.status, req.body.id_music, req.body.id_user, req.body.created_at];
            //var table = ["solicitation"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('post /solicitations 400 ERROR');
                    res.json({"Error" : err, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('post /solicitations 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "solicitations" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    //=================================== END CRUD SOLICITAÇÕES ==============================//

    //=================================== START CRUD FCM ===================================//

    router.get("/fcm/:id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT * FROM ?? WHERE ?? = ?";
            var table = ["fcm", "id_user", req.params.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /fcm 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /fcm 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "fcm" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.get("/fcm/get/super",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT * FROM ?? JOIN user ON user.id = fcm.id_user WHERE user.type = 2";
            var table = ["fcm"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /fcm 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /fcm 200 OK');
                    console.log(rows);
                    res.json({"Error" : false, "Message" : "Success", "fcm" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.post("/fcm",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "INSERT INTO ??(??, ??) VALUES (?, ?)";
            var table = ["fcm", "id_user", "fcm_id", req.body.id, req.body.fcm_id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('post /fcm 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('post /fcm 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "fcm" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.put("/fcm",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "UPDATE ?? SET fcm_id = '"+req.body.fcm_id+"' WHERE ?? = ?";
            var table = ["fcm", "id_user", req.body.id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /fcm 400 ERROR');
                    console.log(err);
                    res.json({"Error" : true, "Message" : err});
                } else {
                    console.log('get /fcm 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "fcm" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    //=================================== END CRUD FCM ===================================//

    //SELECT COUNT(*) FROM likes WHERE id_solicitacao = 32 and status = 1
    //SELECT solicitation.id as id, music.name as name_music, user.name as name_user, user.id as id_user, user.photo as photo_user,  (SELECT COUNT(*) FROM likes WHERE id_solicitacao = solicitation.id and status = 1) as likes, solicitation.status, solicitation.created_at FROM solicitation INNER JOIN music ON music.id = solicitation.id_music INNER JOIN user ON user.id = solicitation.id_user
    //=================================== START CRUD LIKES ===================================//

    router.get("/likes/user/:id/solicitation/:s_id",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "SELECT * FROM ?? WHERE id_solicitacao = "+req.params.s_id+" and id_usuario ="+req.params.id;
            var table = ["likes"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('get /likes 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('get /likes 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "likes" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.post("/likes",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)";
            var table = ["likes", "id_solicitacao", "id_usuario", "status", req.body.id_solicitacao, req.body.id_usuario, 1];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('post /likes 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('post /likes 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "likes" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });

    router.put("/likes",function(req,res){
        if(req.headers['x-access-token'] == auth) {
            var query = "UPDATE ?? SET status = ? WHERE id_solicitacao = ? AND id_usuario = ?";
            var table = ["likes", req.body.status, req.body.id_solicitacao, req.body.id_usuario];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,rows){
                if(err) {
                    console.log('put /likes 400 ERROR');
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    console.log('put /likes 200 OK');
                    res.json({"Error" : false, "Message" : "Success", "likes" : rows});
                }
            });
        }else{
            res.status(403).send(tokenInvalido);
        }
    });




    //=================================== END CRUD FCM ===================================//


};

module.exports = REST_ROUTER;
