app.config(function($stateProvider) {
    $stateProvider.state('classroom', {
        url: '/classroom',
        templateUrl: 'js/authorized/classroom/classroom.html',
        controller: 'classroomCtrl',
        parent: 'authorized'
    });
});

app.controller('classroomCtrl', function($scope, $sce, $uibModal) {
    $scope.launch = () => {
        var modal = $uibModal.open({
            templateUrl: "js/common/modals/jitsi/jitsi.html",
            controller: `jitsiCtrl`,
            size: 'lg',
            resolve: {
                room: () => {
                    return "testing"
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