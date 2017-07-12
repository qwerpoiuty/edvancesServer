 app.config(function($stateProvider) {
     $stateProvider.state('editQuiz', {
         url: '/editQuiz/:id',
         templateUrl: 'js/authorized/teachers/quizDashboard/editQuiz.html',
         controller: 'editQuizCtrl',
         parent: 'authorized',
         resolve: {
             quiz: (quizFactory, $stateParams) => {
                 return quizFactory.findQuizzes({
                     id: $stateParams.id
                 }).then(quiz => {
                     return quiz
                 })
             }
         },
     });

 })
 app.controller('editQuizCtrl', function($scope, $state, quizFactory, classroomFactory, quiz) {
     $scope.quiz = quiz[0]
     $scope.newQuiz = jQuery.extend(true, {}, $scope.quiz)
     $scope.newQuiz.open = new Date($scope.newQuiz.open)
     $scope.newQuiz.close = new Date($scope.newQuiz.close)
     if ($scope.newQuiz.timeFrame) $scope.timeFrame = true
     if ($scope.user.id !== $scope.quiz.owner) $state.go('dashboard')

     $scope.questions = $scope.quiz.questions

     $scope.removeQuestion = index => {
         $scope.questions.splice(index, 1)
     }
     $scope.updateQuiz = (quiz) => {
         quiz.questions = $scope.questions
         quiz.owner = $scope.user.id
         quizFactory.updateQuiz(quiz).then(response => {
             $state.go('quizDashboard')
         })
     }

     $scope.addQuestion = () => {
         $scope.questions.push({
             answerNumber: 0
         })
     }

     $scope.addAnswers = question => {
         question.answers = new Array(Number(question.answerNumber))
         console.log($scope.questions)
     }
 });