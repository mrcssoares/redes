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

    router.delete("/users/:ic",function(req,res){
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

    // um comentario qualquer

    //=================================== START CRUD SINGER ===================================//

    router.get("/singers",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["singer"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
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
                res.json({"Error" : false, "Message" : "User Added !", "rows" :rows });
            }
        });
    });



    //=================================== START CRUD SINGER ===================================//



    //=================================== START CRUD MUSICAS ===================================//

    router.get("/musics",function(req,res){
        var query = "SELECT * FROM ??";
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
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = ["music","name","dutarion","id_category", "id_singer",req.body.name,req.body.duration, req.body.id_category, req.body.id_singer];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : err, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "musics" : rows});
            }
        });
    });

    //=================================== END CRUD MUSICAS =====================================//
    //
    // var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
    // var table = ["user","name","email","photo", "type",req.body.name,req.body.email,req.body.photo, req.body.type];

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
        var table = ["solicitation", "likes", "status", "id_music", "id_user", "created_at", req.body.likes, req.body.status, req.body.id_music, req.body.id_user, req.body.created_at];
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
