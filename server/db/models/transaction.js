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
    type: {
        type: Sequelize.ENUM('credit', 'purchase', 'payout')
    },
    amount: {
        type: Sequelize.INTEGER
    },
    currency: {
        type: Sequelize.STRING
    },
    classroom: {
        type: Sequelize.INTEGER
    },
    description: {
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