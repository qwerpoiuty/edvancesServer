app.config(function($stateProvider) {
    $stateProvider.state('unauthorized', {
        templateUrl: 'js/unauthorized/unauthorized.html',
        controller: 'unauthorizedCtrl',
        resolve: {}
    });
});

app.controller('unauthorizedCtrl', function($scope, $state) {

});