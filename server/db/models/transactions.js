'use strict';
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('transaction', {
    owner: {
        type: Sequelize.INTEGER
    },
    amount: {
        type: Sequelize.INTEGER
    },
    details: {
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