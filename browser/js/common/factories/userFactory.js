app.factory('userFactory', function($http) {
    var d = {}
    d.findUsers = (query) => {
        return $http.get('/api/users/', {
            params: query
        }).then(response => {
            return response.data
        })
    }

    d.findSingleUser = (email) => {
        var query = {
            email: email
        }
        return $http.get('/api/users/single', {
            params: query
        }).then(response => {
            return response.data
        })
    }

    d.createUser = user => {
        return $http.post('/api/users/', user).then(response => {
            return response.data
        })
    }
    d.updateUser = (user) => {
        return $http.post('/api/users/update', user).then(response => {
            return response.data
        })
    }

    d.deleteUser = (email) => {
        var query = {
            email: email
        }
        return $http.post('/api/users/delete', email).then(response => {
            return response.data
        })
    }

    return d
})