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
            authenticate: true
        }
    });
});

app.controller('authorizedCtrl', function($scope, user, $state, userFactory, $css) {
    $scope.user = user
    if (user.role = 1) {
        $css.bind({
            href: '/teacher.css'
        }, $scope);
    } else {
        $css.bind({
            href: '/student.css'
        }, $scope);
    }
    $scope.getUpdatedUser = (id) => {
        userFactory.findSingleUser(id).then(user => {
            $scope.user = user
            console.log(user)
        })
    }
});