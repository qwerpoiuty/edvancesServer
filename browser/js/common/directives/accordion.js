app.directive('accordion', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                let target = $(element).next(".accordion-content")
                if (element.hasClass("active-tab")) {
                    element.toggleClass("active-tab");
                    target.toggleClass("active-content")
                    target.show()
                } else {
                    element.toggleClass("active-tab");
                    target.toggleClass("active-content")
                    target.hide()
                }
            });
        }
    };
});