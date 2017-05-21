'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var Classroom = db.model('classroom')
var User = db.model('user')
var Transaction = db.model('transaction')
var multer = require('multer')
var azure = require('azure-storage');
var blobSvc = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=edvances;AccountKey=E69FNxbG0QQF+rLoFRRYulGDKWOYMmfUn1WmNtf9uznDauN0yksEgFFZot+sYPcjEGoHSRl2ccPj8R8JAPaHYA==;EndpointSuffix=core.windows.net')
var storage = multer.memoryStorage();
var streamifier = require('streamifier');
var upload = multer({
    storage: storage
})

var ensureAuthenticated = function(req, res, next) {
    var err;
    if (req.isAuthenticated()) {
        next();
    } else {
        err = new Error('You must be logged in.');
        err.status = 401;
        next(err);
    }
};

router.get('/', (req, res) => {
    db.query(`select c.*, u."firstName",u."lastName" from classrooms c inner join users u on u.id = c.teacher`).then(classrooms => {
        res.json(classrooms[0])
    })
})

router.get('/:id', ensureAuthenticated, (req, res) => {
    db.query(`select c.id,teacher.id as teacher_id, teacher."teacherOptions" , teacher."firstName", teacher."lastName", c."startDate",c."endDate", c."lessons", c."times" as class_times, teacher.email as teacher_email, teacher.location as teacher_location, c.title as classroom_title,c.subject, c.students,c.cost,teacher."profilePic"
from classrooms c
inner join users as teacher
on teacher.id = c.teacher where c.id = ${req.params.id} limit 1`).then(classroom => {
        console.log(classroom[0])
        res.json(classroom[0])
    })
})
router.get('/teacher/:id', (req, res) => {
    //remember to fetch prices here as well
    db.query(`select c.id,c.description,c."startDate",c.times, c.subject,c.title from classrooms c inner join users u on u.id = c.teacher where u.id = ${req.params.id}`).then(classrooms => {
        res.json(classrooms[0])
    })
})

router.get('/student/:id', (req, res) => {
    //remember to fetch prices here as well
    db.query(`select c.id,c.description,c."startDate",c.times, c.subject,c.title from classrooms c inner join users u on u.id = any(c.students) where u.id = ${req.params.id}`).then(classrooms => {
        res.json(classrooms[0])
    })
})
router.post('/', ensureAuthenticated, upload.single('thumbnail'), (req, res, next) => {
    Classroom.create(req.body).then(classroom => {
        res.json(classroom)
    }).catch(() => {
        var error = new Error('upload error')
        return next(error)
    })
})
router.post('/withImage', ensureAuthenticated, upload.single('thumbnail'), (req, res, next) => {
    var stream = streamifier.createReadStream(req.file.buffer)
    var classroom = JSON.parse(req.body.classroom)
    var thumbnail = classroom.title + '-' + req.file.originalname + '-' + Date.now()
    blobSvc.createBlockBlobFromStream('class-thumbnails', thumbnail, stream, req.file.size,
        function(error, result, response) {
            if (!error) {
                classroom.image = thumbnail
                Classroom.create(classroom).then(classroom => {
                    res.json(classroom)
                }).catch(() => {
                    var error = new Error('upload error')
                    return next(error)
                })

            }
        })
})

router.post('/update', ensureAuthenticated, (req, res) => {
    const updates = req.body.updates;
    console.log(updates)
    Classroom.findOne({
        where: {
            id: req.body.id
        }
    }).then(classroom => {
        return classroom.updateAttributes(updates)
            .then(updatedClassroom => {
                res.json({
                    header: 200,
                    data: updatedClassroom
                })
            }).catch(() => {
                var error = new Error('Edit Error');
                error.status = 401;
                return next(error);
            })
    })
})
router.post('/image/:id', upload.single('image'), (req, res) => {
    var stream = streamifier.createReadStream(req.file.buffer)
    var thumbnail = classroom.title + '-' + req.file.originalname + '-' + Date.now()
    blobSvc.createBlockBlobFromStream('class-thumbnails', thumbnail, stream, req.file.size,
        function(error, result, response) {
            if (!error) {
                Classroom.findOne({
                    where: {
                        id: req.params.id
                    }
                }).then(classroom => {
                    classroom.image = thumbnail
                    return classroom.save()
                }).then(classroom => {
                    res.json(classroom)
                })

            } else {
                res.json(new Error('upload problem'))
            }
        })
})

router.post('/addStudent', ensureAuthenticated, (req, res) => {
    console.log('hello')
    var classSearch = Classroom.findOne({
        where: {
            id: req.body.classroom_id
        }
    })
    var userSearch = User.findOne({
        where: {
            id: req.body.student_id
        }
    })
    Promise.all([classSearch, userSearch]).then(values => {
        var classroom = values[0]
        var user = values[1]
        Transaction.create({
            owner: user.id,
            type: 'purchase',
            amount: "-" + classroom.cost,
            description: classroom
        }).then(transaction => {
            user.credits = user.credits - classroom.cost
            var students = classroom.students
            students.push(user.id)
            return Promise.all([classroom.update({
                students: students
            }), user.save()])
        }).then(values => {
            res.json(values)
        })
    }).catch(reason => {
        res.json('failed')
    })
})

router.post('/delete', ensureAuthenticated, (req, res) => {
    Classroom.destroy({
        where: {
            title: req.body.title
        }
    }).then(bool => {
        var msg = {
            header: 500,
            payload: 'Unsuccesfully Deleted'
        }
        if (bool == true) {
            msg.header = 200;
            msg.payload = 'Successfuly Deleted';
        }
        res.json(msg)
    })
})