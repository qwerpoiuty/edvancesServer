'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')
var Classroom = require('./models/classroom')
var Document = require('./models/documents')
var Quiz = require('./models/quiz')
var Lesson = require('./models/lesson')
var Transaction = require('./models/transaction')