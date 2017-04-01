app.config(function($stateProvider) {
    $stateProvider.state('quizDashboard', {
        url: '/quizDashboard',
        templateUrl: 'js/authorized/teachers/quizDashboard/quizdashboard.html',
        controller: 'quizDashboardCtrl',
        parent: 'authorized'
    });
});

app.controller('quizDashboardCtrl', ($scope) => {

})