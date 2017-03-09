'use strict';
var bcrypt = require('bcrypt');
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
    startDate: {
        type: Sequelize.DATE
    },
    endDate: {
        type: Sequelize.DATE
    },
    times: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    lessongs: {
        type: Sequelize.JSON
    }
}, {
    instanceMethods: {

    },
    hooks: {

    }
}, {
    timestamps: false
});