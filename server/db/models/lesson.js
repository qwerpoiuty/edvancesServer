'use strict';
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('lesson', {
    title: {
        type: Sequelize.STRING
    },
    startDate: {
        type: Sequelize.DATE
    },
    classroom: {
        type: Sequelize.INTEGER
    },
    endDate: {
        type: Sequelize.DATE
    },
    times: {
        type: Sequelize.ARRAY(Sequelize.DATE)
    },
    sections: {
        type: Sequelize.ARRAY(Sequelize.JSON)
            //[{Title:material_name,description:material description,materials:[ids of docs]}]
    },
    materials: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    }
}, {
    instanceMethods: {

    },
    hooks: {

    }
}, {
    timestamps: false
});