app.config(function($stateProvider) {
    $stateProvider.state('teacher-details', {
        url: '/teacher/:id',
        templateUrl: 'js/unauthorized/teacherDetail/teacherDetail.html',
        parent: 'unauthorized',
        controller: 'teacherDetailCtrl',
        resolve: {
            teacher: function(userFactory, $stateParams) {
                return userFactory.findSingleUser($stateParams.id).then(user => {
                    return user
                })
            },
            classes: function(classroomFactory, $stateParams) {
                return classroomFactory.getClassroomsByTeacher($stateParams.id).then(classrooms => {
                    return classrooms
                })
            }
        }
    });
});

app.controller('teacherDetailCtrl', function($scope, userFactory, classroomFactory, documentFactory, teacher, classes) {
    $scope.teacher = teacher
    $scope.classes = classes
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    documentFactory.getDocuments({
        owner: $scope.teacher.id
    }).then(documents => {
        $scope.credentials = documents
    })
})