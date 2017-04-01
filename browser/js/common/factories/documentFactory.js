app.factory('documentFactory', function($http) {
    var d = {}
        //teachers
    d.getCredentials = (userid) => {
        return $http.get('/api/documents/credentials/' + userid).then(response => {
            return response.data
        })
    }

    d.getDocumentById = (id) => {
        return $http.get('/api/documents/single/' + id).then(response => {
            return response.data
        })
    }
    d.createUserDocument = (doc, user) => {
        var file = doc;
        var fd = new FormData();
        fd.append('credential', file);
        return $http.post('/api/documents/user/' + user.id, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(response => {
            return response.data
        })
    }
    d.createLessonDocument = (doc, lessonId) => {
        var file = doc;
        var fd = new FormData();
        fd.append('material', file);
        return $http.post('/api/lessons/materials/' + lessonId, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(response => {
            console.log(response.data)
            return response.data
        })
    }
    d.deleteDocument = (id) => {
        return $http.post('/api/documents/delete', id).then(response => {
            return response.data
        })
    }

    return d
})