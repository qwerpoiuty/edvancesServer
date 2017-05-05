app.factory('transactionFactory', function($http) {
    var d = {}
        //remember to make a success/failure screen
    d.createSale = (ccinfo, userID) => {

        $http.get('/api/transactions/create', {
            params: ccinfo
        }).then(result => {
            console.log(result)
        })
    }

    d.createPayout = (amount, userId) => {

    }

    return d
})