app.config(function($stateProvider) {
    $stateProvider.state('courses', {
        url: '/courses',
        templateUrl: 'js/unauthorized/courses/courses.html',
        parent: 'unauthorized',
        controller: 'courseListCtrl',
        resolve: {
            classrooms: classroomFactory => {
                return classroomFactory.findAllClassrooms().then(classrooms => {
                    return classrooms
                })
            }
        }
    });
});

app.controller('courseListCtrl', function($scope, classrooms) {
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wedenesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    $scope.classrooms = classrooms
    console.log($scope.classrooms)
})