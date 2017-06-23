app.factory('forumFactory', function($http) {
    var d = {}
    d.getForumsByTeacher = (id) => {
        return $http.get('/api/forums/teacher/' + id).then(response => {
            return response.data
        })
    }

    d.getForumsByStudent = (id) => {
        return $http.get('/api/forums/student/' + id).then(response => {
            return response.data
        })
    }

    d.getThreads = (id) => {
        return $http.get('/api/forums/threads/' + id).then(response => {
            return response.data
        })
    }

    d.getSingleThread = (id) => {
        return $http.get('api/forums/threads/single/' + id).then(response => {
            return response.data
        })
    }

    d.createNewThread = (forumID, thread) => {
        return $http.post('/api/forums/threads/' + forumID, thread).then(response => {
            return response.data
        })
    }

    d.postComment = (comment) => {
        return $http.post('/api/forums/comment', comment).then(response => {
            return response.data
        })
    }

    d.replyToMessage = (parentID, message) => {
        return $http.post('/api/forums/message/' + parentID, message).then(response => {
            return response.data
        })
    }

    d.deleteMessage = (messageID) => {
        return $http.post('/api/forums/message/delete/' + messageID).then(response => {
            return response.data
        })
    }

    d.lockThread = (threadID) => {
        return $http.post('/api/forums/thread/lock/' + threadID).then(response => {
            return response.data
        })
    }

    return d
})