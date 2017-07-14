'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/classrooms', require('./classrooms'));
router.use('/documents', require('./documents'));
router.use('/lessons', require('./lessons'));
router.use('/quizzes', require('./quizzes'));
router.use('/transactions', require('./transactions'))
router.use('/forums', require('./forums'))
// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
    res.status(404).end();
});