'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var Lesson = db.model('lesson')
var Classroom = db.model('classroom')
var Document = db.model('document')
var Quiz = db.model('quiz')
var multer = require('multer')
var azure = require('azure-storage');
var blobSvc = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=edvances;AccountKey=E69FNxbG0QQF+rLoFRRYulGDKWOYMmfUn1WmNtf9uznDauN0yksEgFFZot+sYPcjEGoHSRl2ccPj8R8JAPaHYA==;EndpointSuffix=core.windows.net')
var storage = multer.memoryStorage();
var streamifier = require('streamifier');
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './browser/uploads/lessons')
//     },
//     filename: function(req, file, cb) {
//         cb(null, 'L_' + req.params.id + '-' + file.originalname)
//     }
// })
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
router.get('/', ensureAuthenticated, (req, res, next) => {
    Quiz.findAll({
        where: req.query
    }).then(quizzes => {
        res.json(quizzes)
    }).catch(err => {
        next(err)
    })
})

router.get('/classroom/:id', ensureAuthenticated, (req, res, next) => {
    db.query(`select q.id,q.questions,q.open, q.close,q.timeframe,l.title as lesson_title,q.participants,q.quiz_title from classrooms c
  inner join lessons l on c.id = l.classroom
  inner join quizzes q on q.lesson = l.id
  where c.id = ${req.params.id}`).then(quizzes => {
        res.json(quizzes)
    }).catch(err => {
        next(err)
    })
})

router.get('/student/:id', ensureAuthenticated, (req, res, next) => {
    db.query(`select q.questions, q.open,q.close,q.timeframe, l.title as lesson_title, c.title as classroom_title,c.id as classroom_id
        from quizzes q
        inner join lessons l on q.lesson = l.id
        inner join classrooms c on c.id = l.classroom
        where ${req.params.id} = any(c.students)
        `).then(quizzes => {
        res.json(quizzes)
    }).catch(err => {
        next(err)
    })
})

router.post('/', (req, res, next) => {
    Quiz.create(req.body).then(quiz => {
        res.json({
            status: 200,
            message: `Quiz created`,
            data: quiz
        })
    }).catch(err => {
        next(err)
    })
})

router.post('/delete/:id', ensureAuthenticated, (req, res, next) => {
    Quiz.destroy({
        where: {
            id: req.params.id
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
    }).catch(err => {
        next(err)
    })
})