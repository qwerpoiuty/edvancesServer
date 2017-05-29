app.config(function($stateProvider) {
    $stateProvider.state('threadList', {
        url: '/forums/threads/:id',
        templateUrl: 'js/authorized/forums/threadList/threadList.html',
        controller: 'threadListCtrl',
        parent: 'authorized',
        resolve: {
            threads: (forumFactory, $stateParams) => {
                return forumFactory.getThreads($stateParams.id).then(threads => {
                    return threads
                })
            }
        }
    });
});

app.controller('threadListCtrl', ($scope, threads, $uibModal, $stateParams) => {
    $scope.threads = threads
    console.log('hello', threads)
    $scope.newThread = () => {
        var modalInstance = $uibModal.open({
            templateUrl: "js/common/modals/newThread/newThread.html",
            controller: 'newThreadCtrl',
            size: 'md',
            resolve: {
                user: () => {
                    return $scope.user
                },
                forum: () => {
                    return $stateParams.id
                }
            }
        })
        modalInstance.result.then(result => {
            if (result) {
                $scope.transition(result)
            } else {
                notificationService.displayNotification('Error creating thread')
            }
        })
    }
})