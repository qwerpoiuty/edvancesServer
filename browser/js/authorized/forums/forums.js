app.config(function($stateProvider) {
    $stateProvider.state('forums', {
        url: '/forums',
        templateUrl: 'js/authorized/forums/forums.html',
        controller: 'forumsCtrl',
        parent: 'authorized',
        resolve: {}
    });
});

app.controller('forumsCtrl', function($scope, $uibModal, forumFactory, $state, notificationService) {
    //inits
    if ($scope.user.role === 1) $scope.teacher = true
    else $scope.teacher = false

    if ($scope.teacher) {
        forumFactory.getForumsByTeacher($scope.user.id).then(teacherForums => {
            $scope.teacherForums = teacherForums[0]
        })
    }

    forumFactory.getForumsByStudent($scope.user.id).then(studentForums => {
        $scope.studentForums = studentForums[0]
    })
    $scope.transition = (id) => {
        $state.go('threadList', {
            id: id
        })
    }



})