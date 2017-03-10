app.directive('aside', function($state) {

    return {
        restrict: 'E',
        scope: {
            user: "="
        },
        templateUrl: 'js/common/directives/aside/aside.html',
        link: function(scope) {


        }

    };

});