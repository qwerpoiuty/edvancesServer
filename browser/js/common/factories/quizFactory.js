app.factory('quizFactory', function($http) {
    var d = {}
        //teachers
    d.findQuizzes = (query) => {
        console.log(query)
        return $http.get('/api/quizzes/', {
            params: query
        }).then(response => {
            return response.data
        })
    }

    d.getQuizzesByClassroom = (id) => {
        return $http.get('/api/quizzes/classroom/' + id).then(response => {
            return response.data
        })
    }
    d.getQuizzesByStudent = (studentID) => {
        return $http.get('/api/quizzes/student/' + studentID).then(response => {
            return response.data
        })
    }
    d.createQuiz = quiz => {
        return $http.post('/api/quizzes/', quiz).then(response => {
            return response.data
        })
    }
    d.updatequiz = (quiz) => {
        var updates = {
            id: quiz.id,
            updates: quiz
        }
        return $http.post('/api/quizzes/update', updates).then(response => {
            return response.data
        })
    }

    d.deletequiz = (id) => {
        return $http.post('/api/quizzes/delete/' + id).then(response => {
            return response.data
        })
    }


    return d
})