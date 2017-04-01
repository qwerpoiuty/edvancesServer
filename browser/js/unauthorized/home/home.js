app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/unauthorized/home/home.html',
        parent: 'unauthorized'
    });
});