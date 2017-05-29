app.config(function($stateProvider) {
    $stateProvider.state('transactions', {
        templateUrl: 'js/authorized/teachers/reports/transactions/transactions.html',
        controller: 'transactionsCtrl',
        url: '/transactions',
        parent: 'reports',
        resolve: {}
    });
});

app.controller('transactionsCtrl', function($scope, $state, $stateParams, transactionFactory) {
    transactionFactory.getTransactionsByTeacher($scope.user.id).then(transactions => {
        $scope.transactions = transactions[0]
        console.log($scope.transactions)
    })
});