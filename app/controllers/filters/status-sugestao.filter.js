/**
 * Created by marcos on 17/06/17.
 */
/**
 * Created by marcos on 24/05/17.
 */
angular.module("song").filter('statusSugestao', function() {
    return function(input) {
        if (input == '0'){
            return "Não avaliado";
        }else{
            if(input == '1') {
                return "Aceito";
            }else {
                return "Recusado";
            }
        }
    };
});
