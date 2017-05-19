app.config(function($stateProvider) {
    $stateProvider.state('forum', {
        url: '/forum/',
        templateUrl: 'js/authorized/forum/forum.html',
        controller: 'forumCtrl',
        parent: 'authorized',
        resolve: {}
    });
});

app.controller('forumCtrl', function($scope, $sce, $uibModal, classroom, classroomFactory, $stateParams, lessons, documentFactory, moment, Socket) {
    //inits

})