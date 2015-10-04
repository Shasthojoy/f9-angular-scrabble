(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', mainController);

    function mainController($log, GameService) {

        GameService.init()
            .then(function() {
                _setUp();
            }, function(error){
                $log.error('Init -> Error: ', error);
            });


        function _setUp() {
            $log.info('MainCtrl From Promise!!!');

        }
    }
})();
