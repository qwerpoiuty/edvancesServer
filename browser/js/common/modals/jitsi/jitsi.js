app.controller('jitsiCtrl', function($scope, $uibModalInstance, room) {
    var domain = "meet.jit.si";
    var width = 700;
    var height = 700;
    $scope.room = room
    $scope.test = () => {
        console.log(document.getElementById("jitsi"))
        $scope.videoApi = new JitsiMeetExternalAPI(domain, "test", width, height, document.getElementById("jitsi"));
        $scope.videoApi.executeCommand('toggleFilmStrip')
    }

    $scope.close = () => {
        $scope.videoApi.dispose()
        $uibModalInstance.close()
    }
});