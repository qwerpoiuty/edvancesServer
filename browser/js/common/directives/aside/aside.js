app.directive('aside', function($state, AuthService) {

    return {
        restrict: 'E',
        scope: {
            user: "="
        },
        templateUrl: 'js/common/directives/aside/aside.html',
        link: function(scope) {
            scope.templateUrl = () => {
                if (scope.user.role === 1) return 'js/authorized/teachers/aside.html'
                else return "js/authorized/students/aside.html"
            }

            scope.logout = () => {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            }

        }

    };

});