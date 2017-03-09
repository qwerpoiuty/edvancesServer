'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var Classroom = db.model('classroom')

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

router.get('/delete', ensureAuthenticated, (req, res) =>{
     Classroom.destroy({
        where: {
            title: req.query.title
        },
        attributes: ['id', 'title']

    }).then(user => {
        res.json(user)
    })
})