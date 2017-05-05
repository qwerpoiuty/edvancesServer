app.config(function($stateProvider) {
    $stateProvider.state('myCourses', {
        url: '/myCourses',
        templateUrl: 'js/authorized/myCourses/myCourses.html',
        controller: 'myCourseCtrl',
        parent: 'authorized',
        resolve: {

        }
    });
});

app.controller('myCourseCtrl', function($scope, user, userFactory, classroomFactory, $state) {
    $scope.teacher = $scope.user.role == 1
    console.log($scope.user)
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    if ($scope.teacher) {
        classroomFactory.getClassroomsByTeacher($scope.user.id).then(result => {
            $scope.classrooms = result
        })
    } else {
        classroomFactory.getClassroomsByStudent($scope.user.id).then(result => {
            $scope.classrooms = result.data
        })
    }
    $scope.transition = classroomId => {
        $state.go('classroom', {
            id: classroomId
        })
    }
});