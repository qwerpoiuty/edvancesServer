app.config(function($stateProvider) {
    $stateProvider.state('authorized', {
        templateUrl: 'js/authorized/authorized.html',
        controller: 'authorizedCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(user => {
                    return user
                })
            }
        },
        data: {
            css: ['./private-styles.css']
                // authenticate: true
        }
    });
});

app.controller('authorizedCtrl', function($scope, user, $state, userFactory) {
    $scope.user = user
    $scope.getUpdatedUser = (id) => {
        userFactory.findSingleUser(id).then(user => {
            $scope.user = user
            console.log(user)
        })
    }
});