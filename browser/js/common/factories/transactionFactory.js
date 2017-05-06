app.factory('transactionFactory', function($http) {
    var d = {}
        //remember to make a success/failure screen
    d.createSale = (ccinfo, userID) => {

        return $http.get('/api/transactions/create/' + userID, {
            params: ccinfo
        }).then(result => {
            return result.data
        })
    }

    d.createPayout = (amount, userId) => {

    }

    return d
})