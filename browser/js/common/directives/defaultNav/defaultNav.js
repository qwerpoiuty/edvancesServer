app.directive('homeNav', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/defaultNav/defaultNav.html',
        link: function(scope) {

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('login');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            scope.fold = function() {
                document.getElementById('app').classList.toggle('app-aside-folded')
            }
            scope.dropdown = function(node) {
                console.log(node.target)
            }
            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});