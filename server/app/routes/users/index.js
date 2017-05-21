'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var User = db.model('user')
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

router.get('/', (req, res) => {
    User.findAll({
        where: req.query
    }).then(users => {
        users.forEach(e => {
            return _.omit(e.toJSON(), ['password', 'salt'])
        })
        res.json(users)

    })
})

router.get('/allTeachers', (req, res) => {
    db.query(`select users.*, count(classrooms.id) as number_of_courses from users
inner join classrooms on users.id = classrooms.teacher
where users.role = 1
group by users.id
`).then(users => {
        users[0].forEach(e => {
            return _.omit(e, ['password', 'salt'])
        })
        res.json(users)
    })
})

router.get('/single', (req, res) => {
    User.findOne({
        where: {
            id: req.query.id
        }
    }).then(user => {
        res.json(_.omit(user.toJSON(), ['password', 'salt']))
    })
})

router.post('/', (req, res) => {
    User.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: req.body
    }).spread((user, created) => {
        if (!created) {
            var message = {
                header: 401,
                message: "That email is already registered"
            }
            res.json(message)
        } else {
            var message = {
                header: 200,
                message: "User created"
            }
            res.json(message)
        }
    })
})

router.post('/profilePic/:id', upload.single('profilePic'), (req, res) => {
    var stream = streamifier.createReadStream(req.file.buffer)
    var picName = req.params.id + '-' + req.file.originalname
    blobSvc.createBlockBlobFromStream('profile-pictures', req.params.id + '-' + req.file.originalname, stream, req.file.size,
        function(error, result, response) {
            if (!error) {
                User.findById(req.params.id).then(user => {
                    user.profilePic = picName
                    return user.save()
                }).then((user) => {
                    res.json({
                        status: 200,
                        message: 'Successfully uploaded',
                        data: _.omit(user.toJSON(), ['password', 'salt'])
                    })
                })
            }
        })
})

router.post('/delete', ensureAuthenticated, (req, res) => {
    User.destroy({

        where: {
            email: req.body.email
        }
    }).then(bool => {
        var msg = {
            header: 500,
            payload: 'Unsuccesfully Deleted'
        }
        if (bool == true) {
            msg.header = 200;
            msg.payload = 'Successfuly Deleted'
        }
        res.json(msg)
    })
})


router.post('/update', ensureAuthenticated, (req, res) => {
    const updates = req.body.updates;
    User.findOne({
        where: {
            id: req.body.id
        }
    }).then(user => {
        return user.updateAttributes(updates)
            .then(updatedUser => {
                res.send({
                    updatedUser: updatedUser.sanitize()
                });
            })
    })
})

router.post('/profilePic/:id', ensureAuthenticated, upload.single('profilePic'), (req, res) => {
    User.findById(req.params.id)
        .then(function(user) {
            return user.update({
                profilePic: req.file.buffer
            })
        }).then(function(updatedUser) {
            res.send({
                updatedUser: updatedUser.sanitize()
            });
        })
})
router.post('/doc/:id', upload.single('doc'), function(req, res) {
    User.findById(req.params.id)
        .then(function(user) {
            if (user.documents === null) {
                user.documents = [req.file.buffer]
            } else {
                user.documents.push(req.file.buffer)
            }
            return user.save()
        }).then(function(updatedUser) {
            res.send({
                updatedUser: _.omit(updatedUser.toJSON(), ['password', 'salt'])
            });
        })
})