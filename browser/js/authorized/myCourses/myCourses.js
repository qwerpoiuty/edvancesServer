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

app.controller('myCourseCtrl', function($scope, user, userFactory, classroomFactory, $state, $uibModal) {
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
            console.log($scope.classrooms)
        })
    } else {
        classroomFactory.getClassroomsByStudent($scope.user.id).then(result => {
            $scope.classrooms = result
        })
    }
    $scope.editClassroom = (classId) => {
        var modalInstance = $uibModal.open({
            templateUrl: "js/common/modals/editClassroom/editClassroom.html",
            controller: 'editClassroomCtrl',
            size: 'md',
            resolve: {
                classroom: () => {
                    console.log(classId)
                    return classroomFactory.findSingleClassroom(classId).then(classroom => {
                        return classroom[0]
                    })
                }
            }
        })
        modalInstance.result.then(result => {
            if (result) {
                classroomFactory.findSingleClassroom($stateParams.id).then(response => {
                    $scope.classroom = response
                })
            }
        })
    }
    $scope.transition = classroomId => {
        $state.go('classroom', {
            id: classroomId
        })
    }
});