app.directive('footer', function($state, classroomFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/footer/footer.html',
        link: function(scope) {
            classroomFactory.findAllClassrooms().then(classrooms => {
                scope.classrooms = [classrooms[0], classrooms[1]]
            })
            scope.transition = (id) => {
                $state.go('course-details', {
                    id: id
                })
            }

        }

    };

});