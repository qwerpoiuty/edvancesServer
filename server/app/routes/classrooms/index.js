'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var Classroom = db.model('classroom')
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
    db.query(`select teacher.id as teacher_id, teacher.name as teacher_name, c."startDate",c."endDate", c."lessons", c."times" as class_times, teacher.email as teacher_email, teacher.location as teacher_location, c.title as classroom_title,c.subject 
from classrooms c
inner join users as teacher
on teacher.id = c.teacher where c.id = ${req.params.id} limit 1`).then(classroom => {
        res.json(classroom[0])
    })
})
router.get('/user/:id', (req, res) => {
    //remember to fetch prices here as well
    db.query(`select c.description,c."startDate",c.times, c.subject,c.title from classrooms c inner join users u on u.id = c.teacher where u.id = ${req.params.id}`).then(classrooms => {
        res.json(classrooms[0])
    })
})

router.post('/', ensureAuthenticated, (req, res) => {
    Classroom.create(req.body).then(classroom => {
        res.json(classroom)
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

router.post('/update', ensureAuthenticated, (req, res) => {
    console.log(chalk.blue.bgYellow.bold("UPDATE ROUTE"))
    const updates = req.body.updates;
    Classroom.findOne({
        where: {
            title: req.body.title
        }
    }).then(classroom => {
        return classroom.updateAttributes(updates)
            .then(updatedClassroom => {
                console.log(chalk.red.bgYellow.bold(JSON.stringify(updatedClassroom)))
                res.json(updatedClassroom)
            })
    })
})