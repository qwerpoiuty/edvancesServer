app.config(function($stateProvider) {
    $stateProvider.state('payroll', {
        templateUrl: 'js/authorized/profile/payroll/payroll.html',
        controller: 'payrollCtrl',
        parent: 'edit'
    });
});

app.controller('payrollCtrl', function($scope, userFactory, transactionFactory, $uibModal, $state) {
    $scope.createPayout = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/common/modals/payments/payments.html',
            controller: 'paymentsCtrl',
            size: 'md',
            resolve: {
                user: () => {
                    return $scope.user
                }
            }
        })
        modalInstance.result.then(result => {
            if (result) {
                $state.go('dashboard')
            }
        })
    }

});