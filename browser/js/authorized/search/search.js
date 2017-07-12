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
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    $scope.classrooms = classrooms
    $scope.teacher = ($scope.user.role === 1)
    console.log(classrooms)

    $scope.transition = (id) => {
        $state.go('classroom', {
            id: id
        })
    }
});