app.controller('lessonCtrl', function($scope, classroomFactory, $stateParams, $uibModalInstance, lesson) {
    $scope.lesson = lesson
    if ($scope.lesson == null) $scope.sections = []
    else {
        $scope.sections = $scope.lesson.sections
        $scope.lesson.startDate = new Date($scope.lesson.startDate)
        $scope.lesson.endDate = new Date($scope.lesson.endDate)
    }
    $scope.addSection = () => {
        $scope.sections.push({})
    }
    $scope.cancel = () => {
        $uibModalInstance.close(false)
    }

    $scope.createLesson = lesson => {
        console.log(lesson, $scope.sections)
        lesson.sections = $scope.sections
        classroomFactory.createLesson($stateParams.id, lesson).then(lesson => {
            $uibModalInstance.close(lesson)
        })
    }
})