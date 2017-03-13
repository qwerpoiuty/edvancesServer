'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var User = db.model('user')

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
    User.findAll().then(users => {
        res.json(users)
    })
})

router.get('/email', ensureAuthenticated, (req, res) => {
    User.findOne({
        where: {
            email: req.query.email
        },
        attributes: ['id', 'email']

    }).then(user => {
        res.json(user)
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


router.post('/update', ensureAuthenticated, (req,res)=>{
    console.log(chalk.blue.bgYellow.bold("UPDATE ROUTE"))
    const updates = req.body.updates;
      User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        return user.updateAttributes(updates)
        .then(updatedUser => {
            res.send({
                updatedUser: _.omit(updatedUser.toJSON(), ['password', 'salt'])
            });
        })
    })
})
