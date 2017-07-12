app.factory('classroomFactory', function($http) {
    var d = {}
    d.findAllClassrooms = () => {
        return $http.get('/api/classrooms/').then(response => {
            return response.data
        })
    }

    d.getClassroomsByTeacher = (id) => {
        return $http.get('/api/classrooms/teacher/' + id).then(response => {

            return response.data
        })
    }
    d.getCurrentTeacherClassrooms = (id) => {
        return $http.get('/api/classrooms/currentTeacherClassrooms/' + id).then(response => {
            return response.data
        })
    }
    d.getClassroomsByStudent = (id) => {
        return $http.get('/api/classrooms/student/' + id).then(response => {

            return response.data
        })
    }
    d.getCurrentStudentClassrooms = (id) => {
        return $http.get('/api/classrooms/currentStudentClassrooms/' + id).then(response => {
            return response.data
        })
    }

    d.findSingleClassroom = (id) => {
        return $http.get('/api/classrooms/' + id).then(response => {

            return response.data
        })
    }

    d.createClassroom = (classroom, thumbnail) => {
        if (thumbnail) {
            var file = thumbnail;
            var fd = new FormData();
            fd.append('thumbnail', file);
            fd.append('classroom', angular.toJson(classroom))
            return $http.post('/api/classrooms/withImage', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(response => {
                return response.data
            })
        } else {
            return $http.post('/api/classrooms/', classroom).then(response => {
                return response.data
            })
        }
    }

    d.updateClassroom = (classroomId, updates) => {
        let updatedClassroom = {
            id: classroomId,
            updates: updates
        }
        return $http.post('/api/classrooms/update', updatedClassroom).then(response => {
            return response.data
        })
    }

    d.changeImage = (classroomId, picture) => {
        var file = picture;
        var fd = new FormData();
        fd.append('image', file);
        console.log(picture)
        return $http.post('/api/classrooms/image/' + classroomId, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(response => {
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
        return $http.post('/api/classrooms/delete', query).then(response => {
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

    d.deleteLesson = (lessonId) => {
        return $http.post('/api/lessons/delete/' + lessonId).then(response => {
            return response.data
        })
    }

    return d
})