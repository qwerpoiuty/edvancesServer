app.config(function($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/authorized/profile/profile.html',
        controller: 'profileCtrl',
        parent: 'authorized'
    });
});

app.controller('profileCtrl', function($scope, $sce, $uibModal, classroomFactory, userFactory) {
    $scope.teacher = ($scope.user.role == 1)
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    classroomFactory.getClassroomsByUser($scope.user.id).then(classrooms => {
        $scope.classrooms = classrooms
    })
});