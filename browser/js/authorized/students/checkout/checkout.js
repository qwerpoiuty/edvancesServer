app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/authorized/students/checkout/checkout.html',
        controller: 'checkoutCtrl',
        parent: 'authorized'
            //you're going to need to resolve all the lessons and quizes this student is a part of ever.
    });
});

app.controller('checkoutCtrl', ($scope, transactionFactory, notificationService) => {
    $scope.shopping = true
    $scope.cardInfoForm = {}
    $scope.checkout = (credits, price, discount) => {
        $scope.shopping = false
        $scope.credits = credits
        $scope.price = price
        $scope.discount = discount
        $scope.transactionFee = 1
        $scope.total = $scope.price + $scope.transactionFee
    }
    $scope.paymentType
    $scope.ccInfo = {}
    $scope.submitPayment = (paymentType) => {
        $scope.ammount = {
            total: $scope.total,
            currency: "USD"
        }
        if (paymentType == "cc") {
            var paypalInfo = {
                method: "credit_card",
                ccInfo: $scope.ccInfo,
                amount: $scope.ammount,
                credits: $scope.credits,
                description: 'Credit Purchase'
            }
            transactionFactory.createSale(paypalInfo, $scope.user.id).then(result => {
                //notification for success and redirect to dashboard
                if (result.status == 200) {
                    var modal = notificationService.displayNotification('Payment Successful')
                    modal.result.then(result => {
                        $state.go('dashboard')
                    })
                } else {
                    var modal = notificationService.displayNotification('Payment Error')
                    modal.result.then(result => {
                        $scope.shopping = true
                        $scope.ccInfo = {}
                        $scope.credits = null
                        $scope.price = null
                        $scope.discount = null
                        $scope.total = null
                    })
                }

            })
        } else if (paymentType == "pp") {

        }
    }
})