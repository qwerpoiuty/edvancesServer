app.config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'dashboardCtrl'
    });
});

app.controller('dashboardCtrl', function($scope) {

});