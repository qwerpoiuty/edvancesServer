app.controller('loginCtrl', function($scope, AuthService, $state, $uibModalInstance) {
    $scope.authError = null;

    $scope.sendLogin = function(loginInfo) {
        $scope.authError = null;
        AuthService.login(loginInfo).then(function(response) {
            $uibModalInstance.close(true)
        }).catch(function(err) {
            $scope.authError = err.message.data;
        });
    };

    $scope.close = () => {
        $uibModalInstance.close(false)
    }
});