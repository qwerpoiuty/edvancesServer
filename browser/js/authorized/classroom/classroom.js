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
    console.log(classroom)
    var domain = "meet.jit.si";
    var width = 740;
    var height = 422;
    $scope.joined = false
    console.log($scope.user)
    $scope.room = `${$scope.user.id}${$scope.classroom.id}`
    $scope.test = () => {
        $scope.joined = true
        $scope.videoApi = new JitsiMeetExternalAPI(domain, "test", width, height, document.getElementById("jitsi"));
        $scope.videoApi.executeCommand('toggleFilmStrip')
    }

    $scope.close = () => {
        $scope.joined = false
        $scope.videoApi.dispose().then(() => {

            $uibModalInstance.close()
        })
    }
});