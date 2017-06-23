'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('comment', {
    author: {
        type: Sequelize.INTEGER
    },
    thread: {
        type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.TEXT
    }

}, {
    instanceMethods: {

    },
    hooks: {

    }
}, {
    timestamps: true
});