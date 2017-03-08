app.config(function($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'profileCtrl'
    });
});

app.controller('profileCtrl', function($scope, $sce, $uibModal) {

});