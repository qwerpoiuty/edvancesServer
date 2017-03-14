app.config(function($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/authorized/profile/profile.html',
        controller: 'profileCtrl',
        parent: 'dashboard'
    });
});

app.controller('profileCtrl', function($scope, $sce, $uibModal) {

});