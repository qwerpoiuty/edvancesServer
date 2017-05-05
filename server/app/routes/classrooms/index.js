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
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './server/uploads/classrooms')
    },
    filename: function(req, file, cb) {
        if (req.owner !== null) {
            cb(null, 'C_' + req.params.id + '-' + file.originalname + '-')
        }
    }
})
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

router.get('/', ensureAuthenticated, (req, res) => {
    Classroom.findAll().then(classrooms => {
        res.json(classrooms)
    })
})

router.get('/:id', ensureAuthenticated, (req, res) => {
    db.query(`select c.id,teacher.id as teacher_id, teacher.name as teacher_name, c."startDate",c."endDate", c."lessons", c."times" as class_times, teacher.email as teacher_email, teacher.location as teacher_location, c.title as classroom_title,c.subject, c.students,c.cost 
from classrooms c
inner join users as teacher
on teacher.id = c.teacher where c.id = ${req.params.id} limit 1`).then(classroom => {
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

router.post('/', ensureAuthenticated, (req, res) => {
    Classroom.create(req.body).then(classroom => {
        res.json(classroom)
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
            amount: classroom.cost,
            description: classroom
        }).then(transaction => {
            user.credits = user.credits - classroom.cost
            var students = classroom.students
            students.push(user.id)
            console.log(students)
            return Promise.all([classroom.update({
                students: students
            }), user.save()])
        }).then(values => {
            console.log('made it too')
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