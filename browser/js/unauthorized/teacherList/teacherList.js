app.config(function($stateProvider) {
    $stateProvider.state('teachers', {
        url: '/teachers',
        templateUrl: 'js/unauthorized/teacherList/teacherList.html',
        parent: 'unauthorized'
    });
});