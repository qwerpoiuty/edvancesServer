'use strict';
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('document', {
    name: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    size: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.TEXT
    },
    owner: {
        type: Sequelize.INTEGER
    },
    classroom: {
        type: Sequelize.INTEGER
    },
    lesson: {
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
    timestamps: true
});