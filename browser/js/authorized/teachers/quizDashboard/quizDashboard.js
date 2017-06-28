app.config(function($stateProvider) {
    $stateProvider.state('quizDashboard', {
        url: '/quizDashboard',
        templateUrl: 'js/authorized/teachers/quizDashboard/quizDashboard.html',
        controller: 'quizDashboardCtrl',
        parent: 'authorized'
    });
});

app.controller('quizDashboardCtrl', ($scope, quizFactory, classroomFactory, $state) => {
    classroomFactory.getClassroomsByTeacher($scope.user.id).then(classrooms => {
        $scope.classrooms = classrooms
    })
    $scope.getQuiz = (id) => {
        quizFactory.getQuizzesByClassroom(id).then(quizzes => {
            $scope.quizzes = quizzes[0]
            console.log($scope.quizzes)
        })
    }

    $scope.deleteQuiz = (id) => {
        quizFactory.deleteQuiz(id).then(response => {
            console.log('deleted')
        })
    }
    $scope.editQuiz = (id) => {
        console.log(id)
        $state.go('editQuiz', {
            id: id
        })
    }
})