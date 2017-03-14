'use strict';
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('classroom', {
    teacher: {
        type: Sequelize.INTEGER
    },
    students: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    title: {
        type: Sequelize.STRING
    },
    subject: {
        type: Sequelize.STRING
    },
    startDate: {
        type: Sequelize.DATE
    },
    endDate: {
        type: Sequelize.DATE
    },
    times: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    lessons: {
        type: Sequelize.JSON
    },
    description: {
        type: Sequelize.TEXT
    }
}, {
    instanceMethods: {

    },
    hooks: {

    }
}, {
    timestamps: false
});