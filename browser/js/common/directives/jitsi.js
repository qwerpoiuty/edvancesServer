app.directive('jitsi', function() {
    return {
        restrict: 'A',
        scope: {
            videoApi: "=",
            room: "@"
        },
        link: function(scope, element, attrs) {

        }
    };
});