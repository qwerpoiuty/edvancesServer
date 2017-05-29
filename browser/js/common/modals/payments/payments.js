app.controller('paymentsCtrl', function($scope, AuthService, $state, $uibModalInstance, transactionFactory, user) {
    $scope.response = null
    $scope.user = user
    $scope.paypal = {}
    $scope.createPayout = function() {
        transactionFactory.createPayout($scope.user.id, $scope.paypal).then(receipt => {
            if (receipt) $scope.response = "Transaction Complete."
            else $scope.response = "Transaction Error"
        })
    };

    $scope.close = () => {
        $uibModalInstance.close(false)
    }
    $scope.ok = () => {
        $uibModalInstance.cloase(true)
    }
});