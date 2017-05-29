'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('thread', {
    title: {
        type: Sequelize.STRING
    },
    forum: {
        type: Sequelize.INTEGER
    },
    author: {
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