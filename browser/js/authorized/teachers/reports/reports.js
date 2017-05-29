app.config(function($stateProvider) {
    $stateProvider.state('reports', {
        templateUrl: 'js/authorized/teachers/reports/reports.html',
        controller: 'reportsCtrl',
        parent: 'authorized',
        resolve: {

        }
    });
});

app.controller('reportsCtrl', function($scope, $sce, $uibModal, userFactory, $state, documentFactory, $stateParams, AuthService, moment) {

});