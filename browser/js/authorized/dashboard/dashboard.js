app.config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/authorized/dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        parent: 'authorized',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(user => {
                    return user
                })
            }
        }
    });
});

app.controller('dashboardCtrl', function($scope, user, userFactory) {
    $scope.user = user
    $scope.dashboards = []
    if ($scope.user.role === 1) {
        $scope.dashboards.push({
            url: "js/authorized/dashboard/teacher.html"
        })
    } else {
        $scope.dashboards.push({
            url: "js/authorized/dashboard/student.html"
        })
    }
});