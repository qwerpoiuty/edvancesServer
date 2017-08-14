app.config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/authorized/dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        parent: 'authorized',
        resolve: {}
    });
});

app.controller('dashboardCtrl', function($scope, user, userFactory, classroomFactory, $state, transactionFactory) {
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
        classroomFactory.getCurrentTeacherClassrooms($scope.user.id).then(currentClasses => {
            $scope.classrooms = currentClasses
            $scope.classrooms.forEach(classroom => {
                Object.keys(classroom.times).forEach(day => {
                    classroom[day] = true
                })
            })
        })
        transactionFactory.getLatestTransactions($scope.user.id).then(transactions => {
            $scope.transactions = transactions[0]
        })
    } else {
        $scope.dashboards.push({
            url: "js/authorized/dashboard/student.html"
        })
        classroomFactory.getClassroomsByStudent($scope.user.id).then(classrooms => {
            $scope.classrooms = classrooms
            $scope.classrooms.forEach(classroom => {
                Object.keys(classroom.times).forEach(day => {
                    classroom[day] = true
                })
            })
        })
    }

    $scope.transition = classroomId => {
        $state.go('classroom', {
            id: classroomId
        })
    }
});