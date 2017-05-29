app.config(function($stateProvider) {
    $stateProvider.state('thread', {
        url: '/forums/threads/:parent/:id',
        templateUrl: 'js/authorized/forums/threadList/thread/thread.html',
        controller: 'threadListCtrl',
        parent: 'authorized',
        resolve: {}
    });
});

app.controller('threadCtrl', ($scope) => {

})