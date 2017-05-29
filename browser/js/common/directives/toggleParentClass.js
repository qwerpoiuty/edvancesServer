app.directive('toggleParentClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                if (element.parent().hasClass(attrs.toggleParentClass)) {
                    element.parent().toggleClass(attrs.toggleParentClass);
                } else {
                    var elements = document.querySelectorAll(`.${attrs.toggleParentClass}`)
                    elements.forEach(e => {
                        e.classList.remove(attrs.toggleParentClass)
                    })
                    element.parent().toggleClass(attrs.toggleParentClass);
                }
            });
        }
    };
});