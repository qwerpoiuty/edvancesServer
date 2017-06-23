app.controller('newThreadCtrl', function($scope, $state, $uibModalInstance, forumFactory, user, forum) {
    $scope.user = user
    $scope.forum = forum
    $scope.authError = null;

    $scope.createNewThread = function() {
        $scope.authError = null;
        $scope.thread.user = $scope.user.id
        forumFactory.createNewThread($scope.forum, $scope.thread).then(thread => {
            $uibModalInstance.close(thread)
        })

    };

    $scope.close = () => {
        $uibModalInstance.close(false)
    }
});