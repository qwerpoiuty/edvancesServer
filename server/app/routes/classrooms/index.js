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

router.post('/update', ensureAuthenticated, (req,res)=>{
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