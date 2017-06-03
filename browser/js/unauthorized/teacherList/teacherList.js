app.config(function($stateProvider) {
    $stateProvider.state('teachers', {
        url: '/teachers',
        templateUrl: 'js/unauthorized/teacherList/teacherList.html',
        parent: 'unauthorized',
        controller: 'teacherCtrl',
        resolve: {
            teachers: (userFactory) => {
                return userFactory.findAllTeachers().then(teachers => {
                    return teachers
                })
            }
        }
    });
});

app.controller('teacherCtrl', function($scope, userFactory, teachers, $state) {
    $scope.teachers = teachers[0]
    $scope.transition = (teacherId) => {
        $state.go('teacher-details', {
            id: teacherId
        })
    }
});