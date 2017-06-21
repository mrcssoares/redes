/**
 * Created by marcos on 17/06/17.
 */
/**
 * Created by marcos on 13/06/17.
 */
/**
 * Created by marcos on 09/05/17.
 */
angular.module("song").factory("likeService", function ($http, config) {

    var _verifyLike = function (id, s_id) {
        return {
            "async": true,
            "crossDomain": true,
            url: config.baseUrl + "/api/likes/user/"+id+"/solicitation/"+s_id,
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        }
    };

    var _addLike = function (id, s_id, status) {
        return {
            "async": true,
            "crossDomain": true,
            url: config.baseUrl + "/api/likes",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data": {
                "id_solicitacao": s_id,
                "id_usuario": id,
                "status": status
            }
        }
    };
    var _updateLike = function (id, s_id, status) {
        return {
            "async": true,
            "crossDomain": true,
            url: config.baseUrl + "/api/likes",
            "method": "PUT",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data": {
                "id_solicitacao": s_id,
                "id_usuario": id,
                "status": status
            }
        }
    };



    return {
        verifyLike: _verifyLike,
        addLike: _addLike,
        updateLike: _updateLike
    };

});