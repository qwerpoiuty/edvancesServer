app.config(function($stateProvider) {
    $stateProvider.state('myGrades', {
        url: '/myGrades',
        templateUrl: 'js/authorized/students/myGrades/myGrades.html',
        controller: 'myGradesCtrl',
        parent: 'authorized'
            //you're going to need to resolve all the lessons and quizes this student is a part of ever.
    });
});

app.controller('myGradesCtrl', ($scope) => {

})