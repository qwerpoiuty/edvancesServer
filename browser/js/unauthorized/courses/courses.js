app.config(function($stateProvider) {
    $stateProvider.state('courses', {
        url: '/courses',
        templateUrl: 'js/unauthorized/courses/courses.html',
        parent: 'unauthorized'
    });
});