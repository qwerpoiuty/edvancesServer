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
        href: '/common.css',
        preload: true,
        persist: true
    }, $scope)
    if (user.role === 1) {
        $css.add('/teacher.css')
    } else {
        $css.add('/student.css')
    }

    $scope.getUpdatedUser = (id) => {
        userFactory.findSingleUser(id).then(member => {
            $scope.user = member
        })
    }
});