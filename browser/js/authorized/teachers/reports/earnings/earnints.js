app.config(function($stateProvider) {
    $stateProvider.state('earnings', {
        templateUrl: 'js/authorized/teachers/reports/earnings/earnings.html',
        controller: 'earningsCtrl',
        url: '/earnings',
        parent: 'reports',
        resolve: {

        }
    });
});

app.controller('earningsCtrl', function($scope, $sce, $uibModal, userFactory, $state, documentFactory, $stateParams, AuthService, moment) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['November 2016', 'December 2016', 'January 2017', 'February 2017', 'March 2017', 'April 2017', 'May 2017'],
            datasets: [{
                label: 'Revenue from Intro to Finances',
                data: [800, 555, 345, 678, 987, 566, 789],
                backgroundColor: "rgba(70,130,180,0.5)"
            }, {
                label: 'Revenue from Corporate Finances',
                data: [400, 350, 431, 345, 231, 143, 567],
                backgroundColor: "rgba(10, 153, 114,0.5)"
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    [800, 555, 345, 678, 987, 566, 789, 400, 350, 431, 345, 231, 143, 567]
});