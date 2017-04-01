app.config(function($stateProvider) {
    $stateProvider.state('faq', {
        url: '/faq',
        templateUrl: 'js/unauthorized/faq/faq.html',
        parent: 'unauthorized'
    });
});