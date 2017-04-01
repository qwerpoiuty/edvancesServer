app.config(function($stateProvider) {
    $stateProvider.state('course-details', {
        url: '/course-details',
        templateUrl: 'js/unauthorized/courseDetails/courseDetails.html',
        parent: 'unauthorized'
    });
});