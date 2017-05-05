'use strict';
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('quiz', {
    classroom: {
        type: Sequelize.INTEGER
    },
    lesson: {
        type: Sequelize.INTEGER
    },
    owner: {
        type: Sequelize.INTEGER
    },
    open: {
        type: Sequelize.DATE
    },
    close: {
        type: Sequelize.DATE
    },
    quiz_title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    timeframe: {
        type: Sequelize.INTEGER
    },
    questions: {
        type: Sequelize.ARRAY(Sequelize.JSON)
    },
    participants: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    },
    pointValue: {
        type: Sequelize.INTEGER
    },
    thumbnail: {
        type: Sequelize.STRING
    }
}, {
    instanceMethods: {

    },
    hooks: {

    }
}, {
    timestamps: false
});