app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'signupCtrl'
    });

})
app.controller('signupCtrl', function($scope, $state, AuthService, userFactory) {

    $scope.teacher = true

    $scope.signup = function(user) {
        $scope.authError = null;

        user.role = 1
        userFactory.createUser(user)
            .then(function(response) {
                if (response) {
                    return AuthService.login($scope.user).then(function(user) {
                        $state.go('profile', {
                            id: user.id
                        })
                    })
                } else {
                    $scope.authError = "That email is already registered"
                }
            });
    };

});