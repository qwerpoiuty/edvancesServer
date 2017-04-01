 app.config(function($stateProvider) {
     $stateProvider.state('newQuiz', {
         url: '/newQuiz',
         templateUrl: 'js/authorized/teachers/quizDashboard/newQuiz.html',
         controller: 'newQuizCtrl',
         parent: 'authorized'
     });

 })
 app.controller('newQuizCtrl', function($scope, $state, quizFactory) {


 });