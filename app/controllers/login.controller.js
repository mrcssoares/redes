/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('loginController', function ($scope) {
    localStorage.setItem('login', 'true');
    console.log(localStorage.getItem('login'));

});
