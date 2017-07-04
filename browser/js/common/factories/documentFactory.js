app.factory('documentFactory', function($http) {
    var d = {}
        //teachers
    d.getDocuments = (query) => {
        return $http.get('/api/documents/', {
            params: query
        }).then(response => {
            return response.data
        })
    }

    d.getClassroomNotes = classroomId => {
        return $http.get('/api/documents/classroom/' + classroomId).then(response => {
            return response.data
        })
    }

    d.getDocumentById = (id) => {
        return $http.get('/api/documents/single/' + id).then(response => {
            return response.data
        })
    }
    d.updateProfilePic = (doc, user) => {
        var file = doc;
        var fd = new FormData();
        fd.append('credential', file);
        return $http.post('/api/documents/user/profile/' + user, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(response => {
            return response.data
        })
    }
    d.createClassroomDoc = (doc, classroomId) => {
        var file = doc
        var fd = new FormData();
        fd.append('note', file);
        console.log(doc)
        return $http.post('/api/documents/classroom/' + classroomId, fd, {
            headers: {
                'Content-Type': undefined
            }
        }).then(response => {
            console.log(response)
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