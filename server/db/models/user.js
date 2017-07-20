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
    credits: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    profilePic: {
        type: Sequelize.STRING,
        defaultValue: "https://edvancesstorage.blob.core.windows.net/profile-pictures/facebook-default-no-profile-pic-400x400.jpg"
    },
    grade: {
        type: Sequelize.STRING
    },
    interests: {
        type: Sequelize.JSON
    },
    location: {
        type: Sequelize.STRING
    },
    // power_level: {
    //     type: Sequelize.INTEGER,
    //     defaultValue: 0
    // },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    subscribed: {
        type: Sequelize.BOOLEAN
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
        }
    }
});