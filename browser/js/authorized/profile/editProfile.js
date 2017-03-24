app.config(function($stateProvider) {
    $stateProvider.state('edit', {
        templateUrl: 'js/authorized/profile/editProfile.html',
        controller: 'editProfileCtrl',
        parent: 'authorized',
        resolve: {

        }
    });
});

app.controller('editProfileCtrl', function($scope, $sce, $uibModal, userFactory, $state, documentFactory, FileSaver, Blob) {
    documentFactory.getCredentials($scope.user.id).then(credentials => {
        $scope.credentials = credentials
    })
    if ($scope.user.profilePic) {
        document.getElementById('john').setAttribute('src', 'data:image/jpeg;base64,' +
            btoa($scope.user.profilePic.data))
    } else {
        $scope.image = "img/a7.jpg"
    }
    $scope.updateUser = user => {
        console.log(user)
        userFactory.updateUser(user).then(user => {
            $state.go('profile')
        })
    }
    $scope.downloadCredential = id => {
        documentFactory.getDocumentById(id).then(doc => {
            var blob = new Blob([doc.data.data], {
                type: doc.type
            });
            FileSaver.saveAs(blob, doc.name);
        })
    }
    $scope.test = function() {
        userFactory.changeProfile($scope.user.id, $scope.newProfilePic).then(response => {
            console.log(response)
        })
    }
    $scope.uploadCredential = () => {
        documentFactory.createUserDocument($scope.newCredential, $scope.user).then(response => {
            $scope.credentials.push($scope.newCredential)
            $scope.newCredentials = null
            document.getElementById('credentialSelect').valu(null)
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

    $scope.detailedView = function(tableId) {
        $state.go('detailed', {
            tableId: tableId
        })
    }
});