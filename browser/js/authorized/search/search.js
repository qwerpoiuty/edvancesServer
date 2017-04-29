app.config(function($stateProvider) {
    $stateProvider.state('search', {
        url: '/search',
        templateUrl: 'js/authorized/search/search.html',
        controller: 'searchCtrl',
        parent: 'authorized',
        resolve: {
            classrooms: (classroomFactory) => {
                return classroomFactory.findAllClassrooms().then(classrooms => {
                    return classrooms
                })
            }
        }
    });
});

app.controller('searchCtrl', function($scope, $uibModal, classroomFactory, userFactory, classrooms, $state) {
    $scope.classrooms = classrooms
    $scope.teacher = ($scope.user.role == 1)
    console.log(classrooms)

    $scope.transition = (id) => {
        $state.go('classroom', {
            id: id
        })
    }
});