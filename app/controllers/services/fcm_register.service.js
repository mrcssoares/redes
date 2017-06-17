/**
 * Created by marcos on 13/06/17.
 */
/**
 * Created by marcos on 09/05/17.
 */
angular.module("song").factory("fcmRegister", function ($http, config) {

    var _verifyFCM = function (id) {
        return {
            "async": true,
            "crossDomain": true,
            url: config.baseUrl + "/api/fcm/"+id,
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        }
    };

    var _createFCM = function (id, fcm_id) {
        return {
            "async": true,
            "crossDomain": true,
            url: config.baseUrl + "/api/fcm/",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data" :{
                "id" : id,
                "fcm_id": fcm_id
            }
        }
    };

    var _updateFCM = function (id, fcm_id) {
        return {
            "async": true,
            "crossDomain": true,
            url: config.baseUrl + "/api/fcm/",
            "method": "PUT",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data" :{
                "id" : id,
                "fcm_id": fcm_id
            }
        }
    };

    var _getAdminFCM = function () {
        return {
            "async": true,
            "crossDomain": true,
            url: config.baseUrl + "/api/fcm/get/super",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        }
    };

    return {
        verifyFCM: _verifyFCM,
        createFCM: _createFCM,
        updateFCM: _updateFCM,
        getAdminFCM: _getAdminFCM
    };

});