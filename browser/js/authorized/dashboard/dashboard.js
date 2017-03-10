app.config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/authorized/dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        parent: 'authorized'
    });
});

app.controller('dashboardCtrl', function($scope) {

});