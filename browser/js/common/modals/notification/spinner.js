app.controller('spinner', function($scope, $uibModalInstance, promise) {
    $scope.promise = promise
    console.log($scope.promise)
    // $scope.promise.then(result => {
    //     $uibModalInstance.close(result)
    // })
})