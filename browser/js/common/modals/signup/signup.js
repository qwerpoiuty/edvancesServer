app.controller('signupCtrl', function($scope, $state, AuthService, userFactory, $uibModalInstance) {
    $scope.signup = function(user) {
        if (user.password !== user.confirm) {
            $scope.authError = "Your passwords don't match"
            return
        }
        $scope.authError = null;
        userFactory.createUser(user)
            .then(function(response) {
                if (response) {
                    $uibModalInstance.close(false)
                    return AuthService.login($scope.user).then(function(user) {
                        $state.go('dashboard')
                    })
                } else {
                    $scope.authError = "That email is already registered"
                }
            });
    };
    $scope.close = () => {
        $uibModalInstance.close(false)
    }
});