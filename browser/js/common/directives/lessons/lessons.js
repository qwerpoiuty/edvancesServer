app.directive('lessons', ($state, classroomFactory, documentFactory, $stateParams) => {
    return {
        restrict: 'E',
        scope: {
            lessons: '=',
            user: '=',
            teacher: '='
        },
        templateUrl: 'js/common/directives/lessons/lessons.html',
        link: (scope, element, attr) => {
            scope.newLesson = false
            scope.addLesson = () => {
                if (!scope.teacher) return
            }
            scope.saveLesson = () => {
                classroomFactory.addLesson($stateParams.id, lesson).then(() => {
                    scope.lessons.push(lesson)
                })
            }

        }
    }
})