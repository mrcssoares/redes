/**
 * Created by marcos on 24/05/17.
 */
angular.module("song").filter('statusSolicitation', function() {
    return function(input) {
        if (input == '0'){
            return "Aguardando";
        }else{
            if(input == '1') {
                return "Cantando";
            }else {
                return "Cantou";
            }
        }
    };
});
