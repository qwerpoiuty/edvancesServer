app.config(function($stateProvider) {
    $stateProvider.state('blog', {
        url: '/blog',
        templateUrl: 'js/unauthorized/blog/blog.html',
        parent: 'unauthorized'
    });
});