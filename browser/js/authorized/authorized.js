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
    $css.bind({
        href: '/private-styles.css'
    }, $scope);
    if (user.role = 1) {
        console.log('hello')
        $css.add('/teacher.css');
    } else {
        $css.add('/student.css');
    }
    $scope.getUpdatedUser = (id) => {
        userFactory.findSingleUser(id).then(user => {
            $scope.user = user
            console.log(user)
        })
    }
});