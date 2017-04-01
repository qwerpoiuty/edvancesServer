app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/unauthorized/checkout/checkout.html',
        parent: 'unauthorized'
    });
});