app.factory('classroomFactory', function($http) {
    var d = {}
    d.findAllClassrooms = (query) => {
        return $http.get('/api/classrooms/').then(response => {
            return response.data
        })
    }

    d.getClassroomsByTeacher = (id) => {
        return $http.get('/api/classrooms/teacher/' + id).then(response => {

            return response.data
        })
    }
    d.getClassroomsByStudent = (id) => {
        return $http.get('/api/classrooms/student/' + id).then(response => {

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
    d.updateClassroom = (classroomId, updates) => {
        var updates = {
            id: classroomId,
            updates: updates
        }
        return $http.post('/api/classrooms/update', updates).then(response => {
            return response.data
        })
    }

    d.addStudent = (classroomId, studentId) => {
        var transaction = {
            student_id: studentId,
            classroom_id: classroomId
        }
        return $http.post('/api/classrooms/addStudent', transaction).then(response => {
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

    d.getClassroomLessons = (classroomId) => {
        return $http.get('/api/lessons/classroomLessons/' + classroomId).then(response => {
            return response.data
        })
    }

    d.getLessonDocuments = (array) => {
        var query = {
            array: array
        }
        return $http.get('/api/documents/array', {
            params: query
        }).then(response => {
            return response.data
        })
    }

    d.updateLesson = (lessonId, attributes) => {
        return $http.post('/api/lessons/update/' + lessonId, attributes).then(response => {
            return response.data
        })
    }

    d.createLesson = (classroomId, lesson) => {
        return $http.post('/api/lessons/' + classroomId, lesson).then(response => {
            return response.data
        })
    }

    return d
})