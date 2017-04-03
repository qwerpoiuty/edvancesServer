app.controller('loginCtrl', function($scope, AuthService, $state, $uibModalInstance) {
    $scope.authError = null;

    $scope.sendLogin = function(loginInfo) {
        $scope.authError = null;
        AuthService.login(loginInfo).then(function() {
            $uibModalInstance.close(false)
            $state.go('dashboard');
        }).catch(function() {
            $scope.authError = 'Invalid login credentials.';
        });
    };

    $scope.close = () => {
        $uibModalInstance.close(false)
    }
});