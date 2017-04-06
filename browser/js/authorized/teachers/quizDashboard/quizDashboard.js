app.config(function($stateProvider) {
    $stateProvider.state('quizDashboard', {
        url: '/quizDashboard',
        templateUrl: 'js/authorized/teachers/quizDashboard/quizdashboard.html',
        controller: 'quizDashboardCtrl',
        parent: 'authorized'
    });
});

app.controller('quizDashboardCtrl', ($scope, quizFactory, classroomFactory) => {
    classroomFactory.getClassroomsByUser($scope.user.id).then(classrooms => {
        $scope.classrooms = classrooms
        $scope.selectedClassroom = $scope.classrooms[0]
    })
    $scope.getQuiz = (id) => {
        console.log(id)
        quizFactory.getQuizzesByClassroom(id).then(quizes => {
            $scope.quizes = quizes
        })
    }
})