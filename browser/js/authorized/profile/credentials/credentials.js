app.config(function($stateProvider) {
    $stateProvider.state('credentials', {
        templateUrl: 'js/authorized/profile/credentials/credentials.html',
        controller: 'credentialsCtrl',
        parent: 'edit'
    });
});

app.controller('credentialsCtrl', function($scope, userFactory, transactionFactory) {
    $scope.teacher = ($scope.user.role == 1)
    $scope.times = {}
    $scope.days = [, , , , , , , ]
    console.log($scope.user)
    if ($scope.user.teacherOptions) {
        Object.keys($scope.user.teacherOptions.times).forEach(time => {
            $scope.times[time] = {}
            $scope.times[time].start = new Date($scope.user.teacherOptions.times[time].start)
            $scope.times[time].end = new Date($scope.user.teacherOptions.times[time].end)
        })
        for (let key of Object.keys($scope.times)) {
            $scope.days[key] = true
        }
    }
    $scope.interests = {}
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }

    $scope.changeProfilePic = pic => {
        userFactory.changeProfilePic(pic, $scope.user.id).then(response => {
            $scope.getUpdatedUser(response.data.id)
        })
    }
    $scope.updateUser = user => {
        let times = {}
        if ($scope.user.role == 1) {
            for (var i = 0; i < $scope.days.length; i++) {
                console.log('hello')
                if ($scope.days[i]) times[i] = $scope.times[i]
            }
            user.teacherOptions.times = times
        }
        userFactory.updateUser(user).then(user => {
            $state.go('profile')
        })
    }

});