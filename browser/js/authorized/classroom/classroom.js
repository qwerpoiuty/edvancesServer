app.config(function($stateProvider) {
    $stateProvider.state('classroom', {
        url: '/classroom/:id',
        templateUrl: 'js/authorized/classroom/classroom.html',
        controller: 'classroomCtrl',
        parent: 'authorized',
        resolve: {
            classroom: (classroomFactory, $stateParams, $state) => {
                return classroomFactory.findSingleClassroom($stateParams.id).then(classroom => {
                    if (classroom.length == 0) $state.go('dashboard')
                    return classroom
                })
            },
            lessons: (classroomFactory, $stateParams) => {
                return classroomFactory.getClassroomLessons($stateParams.id).then(lessons => {
                    return lessons.data
                })
            }
        }
    });
});

app.controller('classroomCtrl', function($scope, $sce, $uibModal, classroom, classroomFactory, $stateParams, lessons, documentFactory, moment, Socket) {
    //inits
    $scope.classroom = classroom[0]
    $scope.lessons = lessons
    $scope.teacher = $scope.user.id === $scope.classroom.teacher_id
    $scope.member = $scope.classroom.students.indexOf($scope.user.id) !== -1 || $scope.teacher
    $scope.weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wedenesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }
    $scope.getNextLesson = function() {
        var today = new moment()
        var times = $scope.classroom.class_times
        for (var key of Object.keys(times)) {
            if (today.isoWeekday() < key) {
                $scope.nextLessonDay = $scope.weekdays[key]
                $scope.nextLessonTime = moment(times[key].start).format("hh:mm a")
                break
            } else if (today.isoWeekday() === key) {
                $scope.nextLessonDay = "Today"
                $scope.nextLessonTime = moment(times[key].start).format("hh:mm a")
                break
            }
            $scope.nextLessonDay = $scope.weekdays[key]
            $scope.nextLessonTime = moment(times[key].start).format("hh:mm a")
        }
        if (today > $scope.classroom.endDate) {
            $scope.nextLesson = 'This class is over'
        }
    }
    $scope.getDocuments = () => {
        $scope.lessons.forEach(lesson => {
            classroomFactory.getLessonDocuments(lesson.materials).then(materials => {
                lesson.materials = materials
            })
        })
    }
    $scope.checkQuizes = () => {
        classroomFactory.checkQuizes($stateParams.id).then()
    }
    $scope.getNextLesson()
    $scope.getDocuments()

    //edits
    $scope.editClassroom = () => {
        var modalInstance = $uibModal.open({
            templateUrl: "js/common/modals/editClassroom/editClassroom.html",
            controller: 'editClassroomCtrl',
            size: 'md',
            resolve: {
                classroom: () => {
                    return $scope.classroom
                }
            }
        })
        modalInstance.result.then(result => {
            if (result) {
                classroomFactory.findSingleClassroom($stateParams.id).then(response => {
                    $scope.classroom = response
                })
            }
        })
    }
    $scope.addLesson = () => {
        var modalInstance = $uibModal.open({
            templateUrl: "js/common/modals/lesson/lesson.html",
            controller: 'lessonCtrl',
            size: 'md',
            resolve: {
                lesson: () => {
                    return
                }
            }
        })
        modalInstance.result.then(result => {
            if (result.data) {
                $scope.lessons.push(result.payload)
            } else {

            }
        })
    }
    $scope.editLesson = (lesson, lessonIndex) => {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/common/modals/lesson/lesson.html',
            controller: 'lessonCtrl',
            size: 'md',
            resolve: {
                lesson: () => {
                    return lesson
                }
            }
        })
        modalInstance.result.then(result => {
            if (result) {
                $scope.lessons[lessonIndex] = result.data
            }
        })
    }
    $scope.removeLesson = (lessonIndex) => {
        //be sure to update the next lesson variabl if it's the closest lesson
        classroomFactory.removeLesson($stateParams.id, lessonIndex).then(response => {
            if (response.status === 200) {
                $scope.lessons.splice(lessonIndex, 1)
            } else alert('nope')
        })
    }
    $scope.addTime = (lessonIndex, time) => {
        //remember to do a check to see if there's gonna be any scheduling conflicts
        classroomFactory.addTime($scope.lessons[lessonIndex], time).then(response => {
            if (response.status === 200) {
                $scope.lessons[lessonIndex].times.push(time)
            } else alert('nice try')
        })
    }
    $scope.removeTime = (lessonIndex, timeIndex) => {
        classroomFactory.removeTime($scope.lessons[lessonIndex], timeIndex).then(response => {
            if (response.status === 200) {
                $scope.lessons[lessonIndex].times.splice(timeIndex, 1)
            } else alert('try again')
        })
    }
    $scope.addLessonDoc = (doc, lessonIndex) => {
        documentFactory.createLessonDocument(doc, $scope.lessons[lessonIndex].id).then(response => {
            $scope.lessons[lessonIndex].materials.push(response.data)
            console.log($scope.lessons)
        })
    }
    $scope.removeDoc = (materialIndex, lesson) => {
        lesson.materials.splice(materialIndex, 1)
        var materials = lesson.materials.map(e => {
            return e.id
        })
        var updates = {
            updates: {
                materials: materials
            }
        }
        classroomFactory.updateLesson(lesson.id, updates).then(response => {
            if (response.status == 200) {
                alert('success')
            } else {
                alert('failed')
            }
        })
    }
    $scope.addClassroomNote = doc => {
        documentFactory.createClassroomDoc(doc, $scope.classroom.id).then(response => {
            $scope.classNotes.push(response.data)
        })
    }

    //jitsi
    var domain = "meet.jit.si";
    $scope.joined = false
    $scope.room = `${$scope.classroom.id}`
    $scope.test = () => {
        $scope.joined = true
        $scope.videoApi = new JitsiMeetExternalAPI(domain, $scope.room, 715, 420, document.getElementById("jitsi"));
        $scope.videoApi.executeCommand('toggleFilmStrip')
    }

    $scope.close = () => {
        $scope.joined = false
        $scope.videoApi.dispose()
    }

    //hide video stream, show whiteboad
    $scope.videoFrame = true
    $scope.whiteboard = false
    $scope.toggleActiveFrame = () => {
        $scope.videoFrame = !$scope.videoFrame
        $scope.whiteboard = !$scope.whiteboard
    }

    //student management
    $scope.addStudent = (studentId) => {
        if ($scope.user.credits >= $scope.classroom.cost) {
            classroomFactory.addStudent($stateParams.id, studentId).then(response => {
                if (response.data = true) {
                    $scope.member = true
                }
            })
        } else {
            alert('Not enough credits')
        }
    }

    //socket
    Socket.emit('join classroom', $scope.room)
    $scope.clearWhiteboard = () => {
        Socket.emit('erase all', true)
    }

    jQuery('#calendar').eCalendar({
        firstDayOfWeek: 1,
        weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        textArrows: {
            previous: '<',
            next: '>'
        },
        eventTitle: 'Events',
        url: '',
        events: [{
            title: 'Event 1',
            description: 'Description 1',
            datetime: new Date(2016, 7, 15, 17)
        }, {
            title: 'Event 2',
            description: 'Description 2',
            datetime: new Date(2016, 7, 14, 16)
        }, {
            title: 'Event 3',
            description: 'jQueryScript.Net',
            datetime: new Date(2016, 7, 10, 16)
        }]
    });
});