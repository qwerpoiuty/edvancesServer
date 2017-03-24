app.factory('userFactory', function($http) {
    var d = {}
        //teachers
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
        var updates = {
            id: user.id,
            updates: user
        }
        return $http.post('/api/users/update', updates).then(response => {
            return response.data
        })
    }
    d.changeProfile = (userId, picture) => {
        var file = picture;
        var fd = new FormData();
        fd.append('profilePic', file);
        return $http.post('/api/users/profilePic/' + userId, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(response => {
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