app.config(function($stateProvider) {
    $stateProvider.state('edit', {
        templateUrl: 'js/authorized/profile/editProfile.html',
        controller: 'editProfileCtrl',
        parent: 'authorized',
        resolve: {

        }
    });
});

app.controller('editProfileCtrl', function($scope, $sce, $uibModal, userFactory, $state, documentFactory, $stateParams, AuthService) {

    $scope.teacher = ($scope.user.role == 1)
    if ($scope.user.profilePic) {
        $scope.image = "img/a7.jpg"
    } else {
        $scope.image = "img/a7.jpg"
    }
    $scope.times = {}
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }

    $scope.changeProfilePic = pic => {
        userFactory.changeProfilePic(pic, $scope.user.id).then(response => {
            AuthService.getLoggedInUser()
        })
    }
    $scope.updateUser = user => {
        user.teacherOptions.times = $scope.times ? $scope.times : []
        console.log(user)
        userFactory.updateUser(user).then(user => {
            $state.go('profile')
        })
    }

    $scope.test = function() {
        userFactory.changeProfile($scope.user.id, $scope.newProfilePic).then(response => {
            console.log(response)
        })
    }



    $scope.openBrowse = function(evt, tabSelection) {
            // Declare all variables
            var i, tabcontent, tablinks;
            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tab-pane");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            // Show the current tab, and add an "active" class to the link that opened the tab
            document.getElementById(tabSelection).style.display = "block";
            evt.currentTarget.className += " active";
            $scope.tables = null
        }
        //detailed view transition

});