'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var Lesson = db.model('lesson')
var Classroom = db.model('classroom')
var Document = db.model('document')
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
    if (req.query.classroomID) {

    } else if (req.query.userID) {

    }
})

router.get('/classroomLessons/:id', ensureAuthenticated, (req, res) => {
    Lesson.findAll({
        where: {
            classroom: req.params.id
        }
    }).then(lessons => {
        res.json({
            status: 200,
            message: 'fetched',
            payload: lessons
        })
    }).catch(() => {
        res.json({
            status: 300,
            message: 'Something went wrong'
        })
    })
})

router.post('/materials/:id', upload.single('material'), (req, res) => {

    var stream = streamifier.createReadStream(req.file.buffer)
    console.log(stream, '------')
    blobSvc.createBlockBlobFromStream('edvances-lesson-docs', 'L_' + req.params.id + '-' + req.file.originalname, stream, req.file.size,
        function(error, result, response) {
            if (!error) {
                var material = {
                    name: req.file.originalname,
                    type: req.file.mimetype,
                    size: req.file.size,
                    lesson: req.params.id
                }
                Document.create(material).then(document => {
                    Lesson.find({
                        where: {
                            id: req.params.id
                        }
                    }).then(lesson => {
                        lesson.materials.push(document.id)
                        lesson.changed('materials', true)
                        lesson.save()
                        res.json({
                            status: 200,
                            message: 'Successfully uploaded',
                            data: document
                        })
                    })
                })
            }
        })
})

router.post('/:classroomID', ensureAuthenticated, (req, res) => {
    req.body.classroom = req.params.classroomID
    Lesson.findOrCreate({
        where: {
            id: req.body.id
        },
        defaults: req.body
    }).spread(function(lesson, created) {
        console.log(created)
        if (created) {
            res.json({
                status: 200,
                data: lesson
            })
        } else {
            lesson.update(req.body).then(lesson => {
                res.json({
                    status: 200,
                    data: lesson
                })
            })
        }
    }).catch(() => {
        res.json({
            status: 300,
            message: 'Something went wrong'
        })
    })
})

router.post('/update/:lessonId', ensureAuthenticated, (req, res) => {
    const updates = req.body.updates
    console.log(updates)
    Lesson.find({
        where: {
            id: req.params.lessonId
        }
    }).then(lesson => {
        lesson.updateAttributes(updates).then(updatedLesson => {
            res.json({
                status: 200,
                data: updatedLesson
            })
        })
    })
})