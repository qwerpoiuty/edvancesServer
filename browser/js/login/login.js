app.config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

})
app.controller('LoginCtrl', function($scope, AuthService, $state) {
    $scope.authError = null;
    $scope.sendLogin = function(loginInfo) {
        $scope.authError = null;
        AuthService.login(loginInfo).then(function() {
            $state.go('dashboard');
        }).catch(function() {
            $scope.authError = 'Invalid login credentials.';
        });
    };
});