app.config(function($stateProvider) {
    $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: 'js/unauthorized/contact/contact.html',
        parent: 'unauthorized'
    });
});