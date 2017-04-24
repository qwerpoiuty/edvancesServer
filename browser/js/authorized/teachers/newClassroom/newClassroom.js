app.config(function($stateProvider) {
    $stateProvider.state('newClassroom', {
        url: '/newClassroom',
        templateUrl: 'js/authorized/teachers/newClassroom/newClassroom.html',
        controller: 'newClassroomCtrl',
        parent: 'authorized'
    });
});

app.controller('newClassroomCtrl', function($scope, $sce, $uibModal, $state, classroomFactory, moment) {
    // $("#editor").wysiwyg()
    $scope.days, $scope.times = {}
    $scope.classroomTimes = {}
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    $scope.createClass = (classroom) => {
        classroom.teacher = $scope.user.id
        classroom.times = {}
        for (var key in Object.keys($scope.days)) {
            if ($scope.days[key]) {
                if ($scope.times[key].start == null || $scope.times[key].end == null) {
                    return {
                        message: 'Please fill in the times'
                    }
                }
                classroom.times[key] = $scope.times[key]
            }
        }
        classroomFactory.createClassroom(classroom).then(classroom => {
            $state.go("classroom", {
                id: classroom.id
            })
        })
    }
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