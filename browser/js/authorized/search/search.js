app.config(function($stateProvider) {
    $stateProvider.state('search', {
        url: '/search',
        templateUrl: 'js/authorized/search/search.html',
        controller: 'searchCtrl',
        parent: 'authorized',
        resolve: {
            classrooms: (classroomFactory) => {
                return classroomFactory.findAllClassroom().then(classrooms => {
                    return classrooms
                })
            }
        }
    });
});

app.controller('searchCtrl', function($scope, $sce, $uibModal, classroomFactory, userFactory, clasrooms) {
    $scope.classrooms = classrooms
    $scope.teacher = ($scope.user.role == 1)

});