app.factory('transactionFactory', function($http) {
    var d = {}
        //remember to make a success/failure screen

    d.getTransactionsByTeacher = (teacherID) => {
        return $http.get('/api/transactions/teacher/' + teacherID).then(response => {
            return response.data
        })
    }

    d.getLatestTransactions = (teacherID) => {
        return $http.get('/api/transactions/latest/' + teacherID)
            .then(response => {
                return response.data
            })
    }

    d.getTransactionsByStudent = (studentID) => {

    }
    d.createSale = (ccinfo, userID) => {

        return $http.get('/api/transactions/create/' + userID, {
            params: ccinfo
        }).then(response => {
            return response.data
        })
    }

    d.createPayout = (userID, paymentInfo) => {

        return $http.post('/api/transactions/payout/' + userID, paymentInfo).then(response => {
            return response.data
        })
    }

    return d
})