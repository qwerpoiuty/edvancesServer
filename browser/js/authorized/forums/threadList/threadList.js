app.config(function($stateProvider) {
    $stateProvider.state('threadList', {
        url: '/forums/:id',
        templateUrl: 'js/authorized/forums/threadList/threadList.html',
        controller: 'threadListCtrl',
        parent: 'authorized',
        resolve: {
            classroom: (classroomFactory, $stateParams, $state) => {
                return classroomFactory.findSingleClassroom($stateParams.id).then(classroom => {
                    if (classroom.length === 0) $state.go('forums')
                    return classroom[0]
                })
            },
            threads: (forumFactory, $stateParams) => {
                return forumFactory.getThreads($stateParams.id).then(threads => {
                    return threads[0]
                })
            }
        }
    });
});

app.controller('threadListCtrl', ($scope, threads, $uibModal, $stateParams, $state, classroom) => {
    $scope.classroom = classroom
    $scope.threads = threads
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
        modalInstance.result.then(thread => {

            if (result) {
                $scope.transition(thread.id)
            } else {
                notificationService.displayNotification('Error creating thread')
            }
        })
    }
    $scope.returnToForumList = () => {
        $state.go('forums')
    }
    $scope.transition = (threadId) => {
        $state.go('thread', {
            parent: $stateParams.id,
            id: threadId
        })
    }
})