app.config(function($stateProvider) {
    $stateProvider.state('newClassroom', {
        templateUrl: 'js/authorized/newClassroom/newClassroom.html',
        controller: 'newClassroomCtrl',
        parent: 'authorized'
    });
});

app.controller('newClassroomCtrl', function($scope, $sce, $uibModal) {
    // $("#editor").wysiwyg()

    $scope.openBrowse = function(target, tabSelection) {
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
        var targetTab = document.getElementById(target);
        targetTab.className += " active";
        $scope.tables = null
    }
});