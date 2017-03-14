app.config(function($stateProvider) {
    $stateProvider.state('classroom', {
        url: '/classroom/:id',
        templateUrl: 'js/authorized/classroom/classroom.html',
        controller: 'classroomCtrl',
        parent: 'authorized',
        resolve: {
            classroom: (classroomFactory, $stateParams) => {
                return classroomFactory.findSingleClassroom($stateParams.id).then(classroom => {
                    return classroom
                })
            }
        }
    });
});

app.controller('classroomCtrl', function($scope, $sce, $uibModal, classroom) {
    $scope.classroom = classroom[0][0]
    console.log($scope.classroom)
    $scope.launch = () => {
        var modal = $uibModal.open({
            templateUrl: "js/common/modals/jitsi/jitsi.html",
            controller: `jitsiCtrl`,
            size: 'lg',
            resolve: {
                room: () => {
                    return $scope.classroom.id
                }
            }
        })
        modal.result.then((result) => {
            if (result) {
                $scope.selectedProject.members = result
                $scope.refreshSingleProject($scope.selectedProject.project_id)
            }
        })
    }
});