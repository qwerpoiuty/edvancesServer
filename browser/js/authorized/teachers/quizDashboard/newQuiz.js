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

     $scope.createQuiz = (quiz) => {
         quiz.questions = $scope.questions
         console.log(quiz)
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