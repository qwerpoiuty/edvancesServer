app.config(function($stateProvider) {
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'js/unauthorized/about/about.html',
        parent: 'unauthorized'
    });
});