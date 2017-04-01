app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/unauthorized/cart/cart.html',
        parent: 'unauthorized'
    });
});