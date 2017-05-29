'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('message', {
    content: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.INTEGER
    },
    thread: {
        type: Sequelize.INTEGER
    },
    parent: {
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