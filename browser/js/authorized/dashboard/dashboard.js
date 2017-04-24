app.config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/authorized/dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        parent: 'authorized',
        resolve: {}
    });
});

app.controller('dashboardCtrl', function($scope, user, userFactory, classroomFactory) {
    $scope.dashboards = []
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    if ($scope.user.role === 1) {
        $scope.dashboards.push({
            url: "js/authorized/dashboard/teacher.html"
        })
        classroomFactory.getClassroomsByTeacher($scope.user.id).then(classrooms => {
            $scope.classrooms = classrooms
            console.log($scope.classrooms)
        })
    } else {
        $scope.dashboards.push({
            url: "js/authorized/dashboard/student.html"
        })
    }
});