app.config(function($stateProvider) {
    $stateProvider.state('unauthorized', {
        templateUrl: 'js/unauthorized/unauthorized.html',
        controller: 'unauthorizedCtrl',
        resolve: {
            user: (AuthService, $state) => {
                return AuthService.getLoggedInUser().then(user => {
                    if (user) $state.go('dashboard')
                })
            }
        }
    });
});

app.controller('unauthorizedCtrl', function($scope, $state, $css) {
    $css.bind({
        href: 'frontend.css',
        preload: true,
        persist: true
    }, $scope)
});