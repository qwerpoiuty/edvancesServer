app.config(function($stateProvider) {
    $stateProvider.state('settings', {
        templateUrl: 'js/authorized/profile/settings/settings.html',
        controller: 'settingsCtrl',
        parent: 'edit'
    });
});

app.controller('settingsCtrl', function($scope, userFactory, transactionFactory, $state) {
    $scope.teacher = ($scope.user.role === 1)
    console.log($scope.teacher)
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
    } else {
        $scope.user.teacherOptions = {}
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
                if ($scope.days[i]) times[i] = $scope.times[i]
            }
            user.teacherOptions.times = times
        }
        userFactory.updateUser(user).then(user => {
            $state.go('profile')
        })
    }

});