app.controller('lessonCtrl', function($scope, classroomFactory, $stateParams, $uibModalInstance, lesson) {
    $scope.lesson = jQuery.extend(true, {}, lesson)
    if ($scope.lesson == null) $scope.sections = []
    else {
        $scope.sections = $scope.lesson.sections
        $scope.lesson.startDate = new Date($scope.lesson.startDate)
        $scope.lesson.endDate = new Date($scope.lesson.endDate)
    }
    $scope.addSection = () => {
        $scope.sections.push({})
    }
    $scope.deleteSection = (index) => {
        $scope.sections.splice(index, 1)
    }
    $scope.cancel = () => {
        $uibModalInstance.close(false)
    }

    $scope.createLesson = lesson => {
        lesson.sections = $scope.sections
        classroomFactory.createLesson($stateParams.id, lesson).then(lesson => {
            $uibModalInstance.close(lesson)
        })
    }
})