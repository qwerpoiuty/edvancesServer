 app.config(function($stateProvider) {
     $stateProvider.state('newQuiz', {
         url: '/newQuiz',
         templateUrl: 'js/authorized/teachers/quizDashboard/newQuiz.html',
         controller: 'newQuizCtrl',
         parent: 'authorized'

     });

 })
 app.controller('newQuizCtrl', function($scope, $state, quizFactory, classroomFactory) {
     classroomFactory.getClassroomsByUser($scope.user.id).then(classrooms => {
         $scope.classrooms = classrooms
         console.log($scope.classrooms)
         $scope.selectedClassroom = $scope.classrooms[0]
     })
     $scope.questions = []

     $scope.getClassroom = classroomId => {
         classroomFactory.getClassroomLessons(classroomId).then(response => {
             $scope.lessons = response.data
         })
     }

     $scope.removeQuestion = index => {
         $scope.questions.splice(index, 1)
     }
     $scope.createQuiz = (quiz) => {
         quiz.questions = $scope.questions
         quiz.owner = $scope.user.id
         quizFactory.createQuiz(quiz).then(response => {
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