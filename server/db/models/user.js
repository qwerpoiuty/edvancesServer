'use strict';
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var Sequelize = require('sequelize');

var chalk = require('chalk')

var db = require('../_db');

module.exports = db.define('user', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    role: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    profilePic: {
        type: Sequelize.STRING
    },
    grade: {
        type: Sequelize.STRING
    },
    interests: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    teacherOptions: {
        type: Sequelize.JSON
            //Teachinglevel, experience, credentials,bio, hours
    }
}, {
    instanceMethods: {
        sanitize: function() {
            return _.omit(this.toJSON(), ['password', 'salt']);
        },
        correctPassword: function(candidatePassword) {
            return bcrypt.compareSync(candidatePassword, this.password, this.salt);
        }
    },
    hooks: {
        beforeCreate: function(user) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(user.password, salt);
            user.salt = salt;
            user.password = hash;
        },
        beforeUpdate: function(user) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(user.password, salt);
            user.salt = salt;
            user.password = hash;
        }
    }
}, {
    timestamps: false
});