app.config(function($stateProvider) {
    $stateProvider.state('edit', {
        templateUrl: 'js/authorized/profile/editProfile.html',
        controller: 'editProfileCtrl',
        parent: 'authorized',
        resolve: {

        }
    });
});

app.controller('editProfileCtrl', function($scope, $sce, $uibModal, userFactory, $state, documentFactory, $stateParams, AuthService, moment) {
    $scope.teacher = $scope.user.role === 1
    $scope.test = function() {
        userFactory.changeProfile($scope.user.id, $scope.newProfilePic).then(response => {
            console.log(response)
        })
    }

});