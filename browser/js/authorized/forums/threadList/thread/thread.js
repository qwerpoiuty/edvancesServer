app.config(function($stateProvider) {
    $stateProvider.state('thread', {
        url: '/forums/:parent/:id',
        templateUrl: 'js/authorized/forums/threadList/thread/thread.html',
        controller: 'threadCtrl',
        parent: 'authorized',
        resolve: {
            comments: ($stateParams, forumFactory) => {
                return forumFactory.getSingleThread($stateParams.id).then(thread => {
                    return thread
                })
            }
        },
        onEnter: ($state, $stateParams) => {
            if (!$stateParams.parent) {
                $state.go('forums')
            }
        }
    });
});

app.controller('threadCtrl', ($scope, comments, $stateParams, forumFactory, $state) => {
    $scope.comments = comments[0]

    $scope.postComment = (newComment) => {
        newComment.author = $scope.user.id
        newComment.thread = $stateParams.id
        console.log('hello', newComment)
        forumFactory.postComment(newComment).then(comment => {
            forumFactory.getSingleThread($stateParams.id).then(thread => {
                $scope.comments = thread[0]
                $scope.newComment = null
            })
        })
    }

    $scope.backToForum = () => {
        $state.go('threadList', {
            id: $stateParams.parent
        })
    }

})