app.config(function($stateProvider) {
    $stateProvider.state('teachers', {
        url: '/teachers',
        templateUrl: 'js/unauthorized/teacherList/teacherList.html',
        parent: 'unauthorized',
        controller: 'teacherCtrl',
        resolve: {
            teachers: (userFactory) => {
                var query = {
                    role: 1
                }
                return userFactory.findUsers(query).then(teachers => {
                    return teachers
                })
            }
        }
    });
});

app.controller('teacherCtrl', function($scope, userFactory, teachers, $state) {
    $scope.teachers = teachers
    console.log($scope.teachers)
    $scope.transition = (teacherId) => {
        $state.go('teacher', {
            id: teacherId
        })
    }
});