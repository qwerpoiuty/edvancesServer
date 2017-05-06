app.config(function($stateProvider) {
    $stateProvider.state('myAssignments', {
        url: '/myAssignments',
        templateUrl: 'js/authorized/students/myAssignments/myAssignments.html',
        controller: 'myAssignmentsCtrl',
        parent: 'authorized'
            //you're going to need to resolve all the lessons and quizes this student is a part of currently.
    });
});

app.controller('myAssignmentsCtrl', ($scope, quizFactory, $state) => {
    $scope.inProgress = false
    quizFactory.getQuizzesByStudent($scope.user.id).then(quizzes => {
        $scope.quizzes = quizzes[0]
    })
    $scope.takeQuiz = (index) => {
        $scope.quizInProgress = $scope.quizzes[index]
        $scope.inProgress = true
        console.log($scope.quizInProgress)
    }
    $scope.submitQuiz = () => {
        quizFactory.submitQuiz($scope.user.id, $scope.quiz.id).then(quiz => {

        })
    }

    $scope.transition = (id) => {
        $state.go('classroom', {
            id: id
        })
    }

})