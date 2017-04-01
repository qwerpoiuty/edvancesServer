app.config(function($stateProvider) {
    $stateProvider.state('teacher-details', {
        url: '/teacher-details',
        templateUrl: 'js/unauthorized/teacherDetail/teacherDetail.html',
        parent: 'unauthorized'
    });
});