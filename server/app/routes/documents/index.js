'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
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

router.get('/array', ensureAuthenticated, (req, res) => {
    Document.findAll({
        where: {
            id: req.query.array
        }
    }).then(documents => {
        res.json(documents)
    })
})

router.get('/single/:id', (req, res) => {
    Document.find({
        where: {
            id: req.params.id
        }
    }).then(doc => {
        res.json(doc)
    })
})

router.get('/credentials/:id', (req, res) => {
    Document.findAll({
        where: {
            owner: req.params.id
        },
        attributes: ['name', 'size', 'type', 'id']
    }).then(credentials => {
        res.json(credentials)
    })
})

router.get('/classroom/:id', (req, res) => {
    Document.findAll({
        where: {
            classroom: req.params.id
        }
    }).then(notes => {
        res.json(notes)
    })
})

router.post('/classroom/:id', upload.single('note'), (req, res) => {
    var stream = streamifier.createReadStream(req.file.buffer)
    var fileName = `C-${req.params.id}-${req.file.originalname}`
    blobSvc.createBlockBlobFromStream('class-documents', fileName, stream, req.file.size, function(err, result, response) {
        if (!err) {
            var note = {
                name: req.file.originalname,
                type: req.file.mimetype,
                size: req.file.size,
                classroom: req.params.id
            }
            Document.create(note).then(document => {
                console.log(document)
                res.json(document)
            })

        }
    })
})

router.post('/assignment/:id', upload.single('assigment'), (req, res) => {

})

router.post('/user/:id', ensureAuthenticated, upload.single('credential'), (req, res) => {
    console.log(req.file)
    var credential = {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
        owner: req.params.id
    }
    Document.create(credential).then(updated => {
        res.json({
            status: 200,
            message: 'Successfully uploaded'
        })
    })
})