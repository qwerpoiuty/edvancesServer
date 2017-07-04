'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var path = require('path');
var chalk = require('chalk')
var db = require('../../../db');
var Lesson = db.model('lesson')
var Classroom = db.model('classroom')
var Document = db.model('document')
var multer = require('multer')
var azure = require('azure-storage');
var env = require(path.join(__dirname, '../../../env'));
var azure_endpoint = env.AZURE_ENDPOINT
var blobSvc = azure.createBlobService(azure_endpoint)
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
        res.json(lessons)
    }).catch(() => {
        res.json({
            message: 'Something went wrong'
        })
    })
})

router.post('/materials/:id', upload.single('material'), (req, res) => {

    var stream = streamifier.createReadStream(req.file.buffer)
    blobSvc.createBlockBlobFromStream('edvances-lesson-docs', 'L-' + req.params.id + '-' + req.file.originalname, stream, req.file.size,
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
                        res.json(document)
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
        if (created) {
            res.json(lesson)
        } else {
            lesson.update(req.body).then(lesson => {
                res.json(lesson)
            })
        }
    }).catch(() => {
        res.json({
            message: 'Something went wrong'
        })
    })
})

router.post('/update/:lessonId', ensureAuthenticated, (req, res, next) => {
    const updates = req.body.updates
    console.log(updates)
    Lesson.find({
        where: {
            id: req.params.lessonId
        }
    }).then(lesson => {
        lesson.updateAttributes(updates).then(updatedLesson => {
            res.json(updatedLesson)
        })
    }).catch(err => next(err))
})

router.post('/delete/:lessonId', ensureAuthenticated, (req, res, next) => {
    Lesson.destroy({
        where: {
            id: req.params.lessonId
        }
    }).then(result => {
        res.sendStatus(200)
    })
})