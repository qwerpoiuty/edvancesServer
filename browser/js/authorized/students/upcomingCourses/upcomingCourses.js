app.config(function($stateProvider) {
    $stateProvider.state('upcomingCourses', {
        url: '/upcomingCourses',
        templateUrl: 'js/authorized/students/upcomingCourses/upcomingCourses.html',
        controller: 'upcomingCoursesCtrl',
        parent: 'authorized'
            //you're going to need to resolve all the courses this student is going to need to take
    });
});

app.controller('upcomingCoursesCtrl', ($scope) => {

})