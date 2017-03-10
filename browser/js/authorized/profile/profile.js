app.config(function($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/authorized/profile/profile.html',
        controller: 'profileCtrl',
        parent: 'authorized'
    });
});

app.controller('profileCtrl', function($scope, $sce, $uibModal) {

});