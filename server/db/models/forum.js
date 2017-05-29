'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('forum', {
    name: {
        type: Sequelize.STRING
    },
    teacher: {
        type: Sequelize.INTEGER
    },
    classroom: {
        type: Sequelize.INTEGER
    }
}, {
    instanceMethods: {

    },
    hooks: {

    }
}, {
    timestamps: true
});