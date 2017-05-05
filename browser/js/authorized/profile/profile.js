app.config(function($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/authorized/profile/profile.html',
        controller: 'profileCtrl',
        parent: 'authorized'
    });
});

app.controller('profileCtrl', function($scope, $sce, $uibModal, classroomFactory, userFactory, transactionFactory) {
    $scope.teacher = ($scope.user.role == 1)
    if ($scope.teacher) {
        classroomFactory.getClassroomsByTeacher($scope.user.id).then(classrooms => {
            $scope.classrooms = classrooms
        })
    } else {
        classroomFactory.getClassroomsByStudent($scope.user.id).then(classrooms => {
            $scope.classrooms = classrooms
        })
    }
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
    $scope.addCredits = () => {
        var cc = {
            "currency": "usd",
            "total": 100,
            "description": 'hello world',
            "method": 'credit_card',
            "type": "visa",
            "number": "4417119669820331",
            "expire_month": "11",
            "expire_year": "2018",
            "cvv2": "874",
            "first_name": "Joe",
            "last_name": "Shopper",
            "billing_address": {
                "line1": "52 N Main ST",
                "city": "Johnstown",
                "state": "OH",
                "postal_code": "43210",
                "country_code": "US"
            }
        }
        transactionFactory.createSale(cc, $scope.user).then(result => {
            console.log(result)
        })
    }

});