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
    console.log($scope.classes)
})