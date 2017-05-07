app.config(function($stateProvider) {
    $stateProvider.state('newClassroom', {
        url: '/newClassroom',
        templateUrl: 'js/authorized/teachers/newClassroom/newClassroom.html',
        controller: 'newClassroomCtrl',
        parent: 'authorized'
    });
});

app.controller('newClassroomCtrl', function($scope, $sce, $uibModal, $state, classroomFactory, moment, Socket) {

    Socket.on('post', function(sockComment) {
        console.log(sockComment)
    })

    $scope.test = () => {
        console.log(Socket)
        Socket.emit('comment', {
            'test': 'test'
        })
    }

    $scope.days = [, , , , , , , ]
    $scope.classThumbnail = null
    $scope.times = {}
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
        for (var i = 0; i < $scope.days.length; i++) {
            if ($scope.days[i]) {
                if ($scope.times[i].start == null || $scope.times[i].end == null) {
                    return alert('please fill out the times')
                }
                classroom.times[i] = $scope.times[i]
            }
        }
        classroomFactory.createClassroom(classroom, $scope.classThumbnail).then(classroom => {
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