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
router.get('/', ensureAuthenticated, (req, res) => {

})

router.get('/classroom/:id', (req, res) => {
    db.query(`select * from classrooms
  inner join lessons on classrooms.id = lessons.classroom
  inner join quizes on quizes.lesson = lessons.id
  where classrooms.id = ${req.params.id}`).then(quizzes => {
        res.json({
            status: 200,
            message: `Quizzes from ${req.params.id}`,
            data: quizzes
        })
    })
})

router.post('/', (req, res) => {
    Quiz.create(req.body).then(quiz => {
        res.json({
            status: 200,
            message: `Quiz created`,
            data: quiz
        })
    })
})