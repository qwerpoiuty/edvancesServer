app.factory('classroomFactory', function($http) {
    var d = {}
    d.findClassrooms = (query) => {
        return $http.get('/api/classrooms/', {
            params: query
        }).then(response => {
            return response.data
        })
    }

    d.findSingleClassroom = (id) => {
        return $http.get('/api/classrooms/' + id).then(response => {
            return response.data
        })
    }

    d.createClassroom = classroom => {
        return $http.post('/api/classrooms/', classroom).then(response => {
            return response.data
        })
    }
    d.updateClassroom = (classroom) => {
        return $http.post('/api/classrooms/update', classroom).then(response => {
            return response.data
        })
    }

    d.deleteClassroom = (classroomId) => {
        var query = {
            id: classroomId
        }
        return $http.post('/api/classrooms/delete', email).then(response => {
            return response.data
        })
    }

    return d
})