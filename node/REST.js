var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;

    router.get("/",function(req,res){
        res.json({"Message" : "Bem vindo a api songUkê !"});
    });


    //=================================== START CRUD USERS =======================================//

    router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["user"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "users" : rows});
            }
        });
    });

    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = ["user","name","email","photo", "type",req.body.name,req.body.email,req.body.photo, req.body.type];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : err, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !", "rows" :rows });
            }
        });
    });

    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, type = 1 WHERE ?? = ?";
        var table = ["user","name",req.body.name, "email",req.body.email, "photo", req.body.photo, 'id', req.body.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });

    router.delete("/users/:id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.id});
            }
        });
    });

    //=================================== END CRUD USERS =======================================//



    //=================================== START CRUD CATEGORY ===================================//

    router.get("/category",function(req,res){
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
    });

    router.post("/category",function(req,res){
        var query = "INSERT INTO ??(??) VALUES (?)";
        var table = ["category", "name", req.body.name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                console.log('post /category 400 ERROR');
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                console.log('post /category 200 OK');
>>>>>>> 3a6960267f864c6c7bbadb09db5c4873da3c03ac
                res.json({"Error" : false, "Message" : "Success", "category" : rows});
            }
        });
    });

    //=================================== START CRUD CATEGORY ===================================//



    //=================================== START CRUD SINGER ===================================//

    router.get("/singers",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["singer"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                console.log('get /singers 200 OK');
                res.json({"Error" : false, "Message" : "Success", "singers" : rows});
            }
        });
    });

    router.post("/singers",function(req,res){
        var query = "INSERT INTO ??(??) VALUES (?)";
        var table = ["singer", "name", req.body.name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : err, "Message" : "Error executing MySQL query"});
            } else {
                console.log('post /singers 200 OK');
                res.json({"Error" : false, "Message" : "User Added !", "singers" :rows });
            }
        });
    });



    //=================================== START CRUD SINGER ===================================//



    //=================================== START CRUD MUSICAS ===================================//

    router.get("/musics",function(req,res){
        var query = "SELECT music.name as music_name, singer.name as singer_name, category.name as category_name, music.status FROM ?? JOIN singer ON singer.id = music.id_singer JOIN category ON category.id = music.id_category";
        var table = ["music"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "musics" : rows});
            }
        });
    });

    router.post("/musics",function(req,res){
        var query = "INSERT INTO ?? (name, duration, id_category, id_singer, status) VALUES ('"+ req.body.name +"', '"+req.body.duration+"', '"+req.body.id_category+"', '"+req.body.id_singer +"', '"+req.body.status+"')";
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
    });

    //=================================== END CRUD MUSICAS =====================================//



    //=================================== START CRUD SOLICITAÇÕES ==============================//

    router.get("/solicitations",function(req,res){
        var query = "SELECT music.name as name_music, user.name as name_user, solicitation.likes, solicitation.status, solicitation.created_at FROM ?? INNER JOIN music ON music.id = solicitation.id_music INNER JOIN user ON user.id = solicitation.id_user";
        var table = ["solicitation"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "solicitations" : rows});
            }
        });
    });

    router.post("/solicitations",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        //var query = "INSERT INTO ?? (likes, status, id_music, id_user, created_at) VALUES ('0', '0', '1', '2', 'teste')";
        var table = ["solicitation", "likes", "status", "id_music", "id_user", "created_at", req.body.likes, req.body.status, req.body.id_music, req.body.id_user, req.body.created_at];
        //var table = ["solicitation"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : err, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "solotitations" : rows});
            }
        });
    });

    //=================================== END CRUD SOLICITAÇÕES ==============================//

};

module.exports = REST_ROUTER;
