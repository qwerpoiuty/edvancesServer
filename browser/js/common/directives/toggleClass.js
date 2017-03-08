app.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                if (element.hasClass(attrs.toggleClass)) {
                    element.toggleClass(attrs.toggleClass);
                } else {
                    var elements = document.querySelectorAll(`.${attrs.toggleClass}`)
                    elements.forEach(e => {
                        e.classList.remove(attrs.toggleClass)
                    })
                    element.toggleClass(attrs.toggleClass);
                }
            });
        }
    };
});