app.config(function($stateProvider) {
    $stateProvider.state('myAssignments', {
        url: '/myAssignments',
        templateUrl: 'js/authorized/students/myAssignments/myAssignments.html',
        controller: 'myAssignmentsCtrl',
        parent: 'authorized'
            //you're going to need to resolve all the lessons and quizes this student is a part of currently.
    });
});

app.controller('myAssignmentsCtrl', ($scope) => {

})