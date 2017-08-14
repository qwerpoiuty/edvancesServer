app.config(function($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/authorized/profile/profile.html',
        controller: 'profileCtrl',
        parent: 'authorized'
    });
});

app.controller('profileCtrl', function($scope, $sce, $uibModal, classroomFactory, userFactory, transactionFactory, documentFactory) {
    $scope.teacher = ($scope.user.role === 1)
    if ($scope.teacher) {
        classroomFactory.getClassroomsByTeacher($scope.user.id).then(classrooms => {
            $scope.classrooms = classrooms
        })
        documentFactory.getDocuments({
            owner: $scope.user.id
        }).then(documents => {
            $scope.credentials = documents
        })
    } else {
        classroomFactory.getClassroomsByStudent($scope.user.id).then(classrooms => {
            $scope.classrooms = classrooms
        })
    }
    console.log($scope.user)
    if ($scope.user.interests) $scope.interests = Object.keys($scope.user.interests).join(', ')
    else $scope.interest = ""

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


});