'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var Forum = db.model('document')
var Classroom = db.model('classroom')
var User = db.model('user')
var Thread = db.model('thread')
var Comment = db.model('comment')
var Message = db.model('message')
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


router.get('/teacher/:id', ensureAuthenticated, (req, res, next) => {
    db.query(`select c.id,f.* from classrooms c
        inner join forums f on f.id = c.id
        inner join users u on c.teacher = u.id
        where u.id = ${req.params.id}`)
        .then(forums => {
            res.json(forums)
        }).catch(err => {
            next(err)
        })
})
router.get('/student/:id', ensureAuthenticated, (req, res, next) => {
    db.query(`select c.id,f.* from classrooms c
        inner join forums f on f.id = c.id
        inner join users u on u.id = any(c.students)
        where u.id = ${req.params.id}`)
        .then(forums => {
            res.json(forums)
        }).catch(err => {
            next(err)
        })
})

router.get('/threads/:id', ensureAuthenticated, (req, res, next) => {
    db.query(`select t.*, u."firstName", u."lastName" from threads t
        inner join users u
        on u.id = t.author
        where t.forum = ${req.params.id}`)
        .then(threads => {
            res.json(threads)
        }).catch(err => {
            next(err)
        })
})

router.get('/threads/single/:id', ensureAuthenticated, (req, res, next) => {
    db.query(`select c.*, CONCAT(u."firstName",' ', u."lastName") as comment_author, u."profilePic",t.title as thread_title ,t."createdAt" as thread_created, CONCAT(u2."firstName",' ',u2."lastName") as thread_author
        from comments c
        inner join users u on c.author = u.id 
        inner join threads t on t.id = c.thread
        inner join users u2 on t.author = u2.id
        where c.thread= ${req.params.id}
        order by c."createdAt" asc`).then(comments => {
        res.json(comments)
    }).catch(err => {
        next(err)
    })
})

router.post('/threads/:id', ensureAuthenticated, (req, res, next) => {
    Thread.create({
        title: req.body.title,
        forum: req.params.id,
        author: req.body.user
    }).then(thread => {
        Comment.create({
            content: req.body.text,
            author: req.body.user,
            thread: thread.id
        }).then(message => {
            res.json(thread)
        })
    }).catch(err => {
        next(err)
    })
})

router.post('/comment', ensureAuthenticated, (req, res, next) => {
    Comment.create(req.body).then(comment => res.json(comment)).catch(err => next(err))
})