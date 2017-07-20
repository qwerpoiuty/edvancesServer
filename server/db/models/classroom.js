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
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
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
        type: Sequelize.JSON
    },
    cost: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: "https://edvancesstorage.blob.core.windows.net/class-thumbnails/classroom-placeholder.png"
    },
    lessons: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
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
    timestamps: true
});