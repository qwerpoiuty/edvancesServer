app.directive('homeNav', function($rootScope, AuthService, AUTH_EVENTS, $state, $uibModal, $css) {

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
                    $state.go('home');
                });
            };
            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    $css.remove('/frontend.css')
                    $css.bind({
                        href: '/common.css',
                        preload: true,
                        persist: true
                    }, $scope)
                    if (user.role === 1) {
                        $css.add('/teacher.css')
                    } else {
                        $css.add('/student.css')
                    }
                    scope.user = user;
                });
            };
            var removeUser = function() {
                scope.user = null;
                $css.remote(['/teacher.css', '/student.css', '/common.css'])
                $css.bind({
                    href: 'frontend.css',
                    preload: true,
                    persist: true
                }, $scope)
            };
            scope.fold = function() {
                document.getElementById('app').classList.toggle('app-aside-folded')
            }
            scope.dropdown = function(node) {
                console.log(node.target)
            }
            setUser();

            scope.templateUrl = () => {
                if (!scope.user) return 'js/common/directives/defaultNav/non-authorized.html'
                else return "js/common/directives/defaultNav/authorizedNav.html"
            }

            scope.login = () => {
                var modalInstance = $uibModal.open({
                    templateUrl: "js/common/modals/login/login.html",
                    controller: 'loginCtrl',
                    size: 'md'
                })
                modalInstance.result.then(bool => {
                    if (bool) $state.go('dashboard')

                })
            }

            scope.signup = () => {
                $uibModal.open({
                    templateUrl: "js/common/modals/signup/signup.html",
                    controller: 'signupCtrl',
                    size: 'md'
                })

            }

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});