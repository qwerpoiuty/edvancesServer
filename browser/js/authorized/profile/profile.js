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
    $scope.templateUrl = () => {
        if ($scope.teacher) return 'js/authorized/profile/teacher.html'
        else return "js/authorized/profile/student.html"
    }
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    console.log($scope.user)
    classroomFactory.getClassroomsByTeacher($scope.user.id).then(classrooms => {
        $scope.classrooms = classrooms
    })
});